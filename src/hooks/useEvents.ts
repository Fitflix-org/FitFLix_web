import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventApi, Event, EventRegistrationData } from '@/lib/api/api';

// Cache configuration
const CACHE_TIMES = {
  EVENTS_LIST: 5 * 60 * 1000, // 5 minutes
  EVENT_DETAIL: 10 * 60 * 1000, // 10 minutes  
  LIVE_DATA: 30 * 1000, // 30 seconds for live data
} as const;

// Query keys for consistent caching
export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (filters: string) => [...eventKeys.lists(), { filters }] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
  live: (id: string) => [...eventKeys.all, 'live', id] as const,
} as const;

/**
 * Hook to fetch and cache upcoming events with smart background revalidation
 * - Initial data loads fast from cache
 * - Background revalidation every 5 minutes
 * - Manual refresh capability
 */
export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: eventKeys.lists(),
    queryFn: async () => {
      const response = await eventApi.getUpcoming();
      return response.events;
    },
    staleTime: CACHE_TIMES.EVENTS_LIST, // Consider data fresh for 5 minutes
    gcTime: CACHE_TIMES.EVENTS_LIST * 2, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on component mount if data is fresh
    refetchInterval: CACHE_TIMES.EVENTS_LIST, // Background refetch every 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook to fetch individual event details with caching
 * - Longer cache time for static event details
 * - Background revalidation
 */
export const useEventDetail = (eventId: string | undefined) => {
  return useQuery({
    queryKey: eventKeys.detail(eventId || ''),
    queryFn: async () => {
      if (!eventId) throw new Error('Event ID is required');
      return await eventApi.getById(eventId);
    },
    enabled: !!eventId, // Only run query if eventId exists
    staleTime: CACHE_TIMES.EVENT_DETAIL,
    gcTime: CACHE_TIMES.EVENT_DETAIL * 2,
    refetchOnWindowFocus: false,
    retry: 3,
  });
};

/**
 * Hook for live event data (registration counts, availability, etc.)
 * - Very frequent updates for real-time data
 * - Separate from static event details for optimal caching
 */
export const useLiveEventData = (eventId: string | undefined) => {
  return useQuery({
    queryKey: eventKeys.live(eventId || ''),
    queryFn: async () => {
      if (!eventId) throw new Error('Event ID is required');
      // This would be a separate API endpoint for live data
      // For now, we'll use the same endpoint but with different caching
      const event = await eventApi.getById(eventId);
      return {
        id: event.id,
        availableSpots: null, // This would need to be calculated from backend
        registrationCount: event.responseCount || 0,
        confirmedCount: event.confirmedCount || 0,
        status: event.status,
        isRegistrationOpen: event.status === 'PUBLISHED' && new Date(event.date) > new Date(),
      };
    },
    enabled: !!eventId,
    staleTime: CACHE_TIMES.LIVE_DATA, // Very short stale time for live data
    gcTime: CACHE_TIMES.LIVE_DATA * 2,
    refetchInterval: CACHE_TIMES.LIVE_DATA, // Refresh every 30 seconds
    refetchOnWindowFocus: true, // Refresh when user returns to tab
    retry: 1, // Less aggressive retry for live data
  });
};

/**
 * Mutation hook for event registration with optimistic updates
 * - Immediate UI feedback
 * - Automatic cache invalidation and refresh
 */
export const useEventRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventId, data }: { eventId: string; data: EventRegistrationData }) => {
      return await eventApi.register(eventId, data);
    },
    onMutate: async ({ eventId }) => {
      // Cancel outgoing refetches for optimistic update
      await queryClient.cancelQueries({ queryKey: eventKeys.live(eventId) });
      
      // Snapshot previous value
      const previousLiveData = queryClient.getQueryData(eventKeys.live(eventId));
      
      // Optimistically update registration count
      queryClient.setQueryData(eventKeys.live(eventId), (old: unknown) => {
        if (!old || typeof old !== 'object') return old;
        const liveData = old as {
          id: string;
          registrationCount: number;
          confirmedCount: number;
          availableSpots: number | null;
          status: string;
          isRegistrationOpen: boolean;
        };
        return {
          ...liveData,
          registrationCount: (liveData.registrationCount || 0) + 1,
          availableSpots: liveData.availableSpots ? liveData.availableSpots - 1 : null,
        };
      });

      return { previousLiveData };
    },
    onError: (err, variables, context) => {
      // Rollback optimistic update on error
      if (context?.previousLiveData) {
        queryClient.setQueryData(eventKeys.live(variables.eventId), context.previousLiveData);
      }
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch both events list and live data
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.live(variables.eventId) });
    },
  });
};

/**
 * Hook to prefetch event details for better UX
 * Call this when user hovers over event cards
 */
export const usePrefetchEventDetail = () => {
  const queryClient = useQueryClient();

  return (eventId: string) => {
    queryClient.prefetchQuery({
      queryKey: eventKeys.detail(eventId),
      queryFn: () => eventApi.getById(eventId),
      staleTime: CACHE_TIMES.EVENT_DETAIL,
    });
  };
};

/**
 * Hook to manually refresh events data
 * - Useful for pull-to-refresh or manual refresh buttons
 */
export const useRefreshEvents = () => {
  const queryClient = useQueryClient();

  return {
    refreshEventsList: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
    },
    refreshEventDetail: (eventId: string) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) });
      queryClient.invalidateQueries({ queryKey: eventKeys.live(eventId) });
    },
    refreshAllEvents: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.all });
    },
  };
};

/**
 * Hook to get cached events count for display
 * - Shows cached data immediately while fresh data loads
 */
export const useCachedEventsCount = () => {
  const queryClient = useQueryClient();
  const cachedEvents = queryClient.getQueryData<Event[]>(eventKeys.lists());
  return cachedEvents?.length || 0;
};

/**
 * Hook for smart background sync
 * - Automatically syncs data when app becomes visible
 * - Handles network reconnection
 */
export const useEventsSyncOnFocus = () => {
  const queryClient = useQueryClient();

  const syncEvents = React.useCallback(() => {
    // Only sync if we have stale data
    queryClient.refetchQueries({ 
      queryKey: eventKeys.lists(),
      type: 'inactive', // Only refetch if data is stale
    });
  }, [queryClient]);

  // Sync when window regains focus
  React.useEffect(() => {
    const handleFocus = () => syncEvents();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [syncEvents]);

  // Sync when network reconnects
  React.useEffect(() => {
    const handleOnline = () => syncEvents();
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [syncEvents]);

  return syncEvents;
};