import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, Clock, Users, ArrowRight, Search, UserPlus, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import OptimizedImage from '@/components/OptimizedImage';
import { Event, EventRegistrationData } from '@/lib/api/api';
import { eventsData as spEventsData } from '@/data/SPEvent';
import { useEventRegistration, usePrefetchEventDetail } from '@/hooks/useEvents';

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrationData, setRegistrationData] = useState<EventRegistrationData>({
    name: '',
    phone: '',
    email: ''
  });
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Using static SPEvent data only
  const eventRegistration = useEventRegistration();
  const prefetchEventDetail = usePrefetchEventDetail();
  const { toast } = useToast();

  const statuses = ['ALL', 'PUBLISHED', 'DRAFT', 'CANCELLED', 'COMPLETED'];
  const cachedEventsCount = spEventsData.length;
  const isLoading = false;
  const isStale = false;

  // Always use SPEvent data (converted to your Event shape)
  const mergedEvents = useMemo(() => {
    return spEventsData.map((spEvent) => ({
      id: spEvent.id,
      title: spEvent.title,
      description: spEvent.description,
      date: spEvent.date,
      location: spEvent.location,
      coverImage: spEvent.image,
      imageUrls: [spEvent.image],
      entryFee: spEvent.price || 0,
      status: 'PUBLISHED',
      responseCount: spEvent.attendees || 0,
      confirmedCount: spEvent.attendees ? Math.ceil(spEvent.attendees * 0.8) : 0,
    } as Event));
  }, [refreshKey]);

  const filteredEvents = useMemo(() => {
    return mergedEvents.filter(event => {
      const matchesSearch = searchTerm === '' ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = selectedStatus === 'ALL' || event.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [mergedEvents, searchTerm, selectedStatus]);

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const handleRegistration = async (event: Event) => {
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
    setRegistrationData({ name: '', phone: '', email: '' });
  };

  const handleEventRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEvent || !registrationData.name || !registrationData.phone || !registrationData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await eventRegistration.mutateAsync({
        eventId: selectedEvent.id,
        data: registrationData
      });

      toast({
        title: "Success",
        description: result.message || "Registration successful! We'll contact you soon.",
      });
      setIsRegistrationOpen(false);
      setRegistrationData({ name: '', phone: '', email: '' });
    } catch (error: unknown) {
      console.error('Error registering for event:', error);
      toast({
        title: "Error",
        description: (error as Error).message || "Registration failed. Please check your connection.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Fitness Events & Workshops | Fitflix</title>
        <meta name="description" content="Join exciting fitness events, workshops, and competitions in Bangalore." />
        <meta property="og:url" content="https://fitflix.in/events" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6">Fitness Events & Workshops</h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">Join exciting fitness events, workshops, and competitions in Bangalore</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-slate-100">
                <Calendar className="mr-2 h-5 w-5" /> View All Events
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                <MapPin className="mr-2 h-5 w-5" /> Find Events Near You
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search & Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => <SelectItem key={status} value={status}>{status === 'ALL' ? 'All Events' : status}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm" onClick={() => setRefreshKey(k => k + 1)} className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {navigator.onLine ? (
                    <div className="flex items-center gap-1">
                      <Wifi className="h-4 w-4 text-green-500" />
                      <span className={isStale ? 'text-yellow-600' : 'text-green-600'}>{isStale ? 'Updating...' : 'Live'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <WifiOff className="h-4 w-4 text-red-500" />
                      <span className="text-red-600">Offline</span>
                    </div>
                  )}
                  <span className="text-xs">({cachedEventsCount} local)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {isLoading ? (
            <div>Loading…</div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => {
                const { date, time } = formatEventDate(event.date);
                return (
                  <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden" onMouseEnter={() => prefetchEventDetail(event.id)}>
                    <div className="relative overflow-hidden">
                      <OptimizedImage src={event.coverImage || '/media/placeholder.svg'} alt={event.title} width={400} height={300} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white text-slate-900 border-0 shadow-md">{event.entryFee === 0 || !event.entryFee ? 'FREE' : `₹${event.entryFee}`}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-4 bg-white">
                      <div className="flex items-center space-x-4 text-sm text-slate-500 mb-2">
                        <div className="flex items-center space-x-1"><Calendar className="h-4 w-4" /><span>{date}</span></div>
                        <div className="flex items-center space-x-1"><Clock className="h-4 w-4" /><span>{time}</span></div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors cursor-pointer">{event.title}</h3>

                      {event.location && (
                        <div className="flex items-center space-x-1 text-sm text-slate-500 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}

                      <p className="text-slate-600 mb-3 line-clamp-3">{event.description}</p>

                      {event.responseCount !== undefined && (
                        <div className="flex items-center space-x-1 text-sm text-slate-500 mb-3">
                          <Users className="h-4 w-4" />
                          <span>{event.responseCount} registered{event.confirmedCount !== undefined && ` (${event.confirmedCount} confirmed)`}</span>
                        </div>
                      )}

                      <div className="mt-3 flex items-center justify-between">
                        <Button variant="ghost" className="p-0 h-auto text-orange-500 hover:text-orange-600 font-semibold group-hover:translate-x-1 transition-transform" onClick={() => { window.location.href = `/events/${event.id}`; }}>
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        {event.status === 'PUBLISHED' && new Date(event.date) > new Date() && (
                          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => handleRegistration(event)}>
                            <UserPlus className="h-4 w-4 mr-2" /> Register
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-12 w-12 text-orange-500" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">No Events Found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your search criteria or check back later for new events.</p>
                <Button onClick={() => { setSearchTerm(''); setSelectedStatus('ALL'); }} className="bg-orange-500 hover:bg-orange-600 text-white">Clear Filters</Button>
              </div>
            </div>
          )}

          {/* SEO Content */}
          <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Join the Fitflix Community</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Why Join Our Events?</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start space-x-2"><div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div><span>Learn from certified fitness experts and trainers</span></li>
                  <li className="flex items-start space-x-2"><div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div><span>Connect with like-minded fitness enthusiasts</span></li>
                  <li className="flex items-start space-x-2"><div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div><span>Try new workout styles and techniques</span></li>
                  <li className="flex items-start space-x-2"><div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div><span>Get exclusive access to premium fitness content</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Event Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {['Fitness Workshops','Nutrition Seminars','Yoga Sessions','Strength Training','Cardio Challenges','Wellness Retreats','Community Workouts','Expert Talks'].map((category) => (
                    <span key={category} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{category}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Dialog */}
        <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-orange-500" /> Register for Event</DialogTitle>
            </DialogHeader>

            {selectedEvent && (
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900">{selectedEvent.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-orange-700 mt-2">
                    <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /><span>{formatEventDate(selectedEvent.date).date}</span></div>
                    <div className="flex items-center gap-1"><Clock className="h-4 w-4" /><span>{formatEventDate(selectedEvent.date).time}</span></div>
                  </div>
                  {selectedEvent.location && (<div className="flex items-center gap-1 text-sm text-orange-700 mt-1"><MapPin className="h-4 w-4" /><span>{selectedEvent.location}</span></div>)}
                  <div className="text-sm text-orange-700 mt-1">Entry Fee: {selectedEvent.entryFee === 0 || !selectedEvent.entryFee ? 'FREE' : `₹${selectedEvent.entryFee}`}</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" value={registrationData.name} onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })} placeholder="Enter your full name" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" value={registrationData.phone} onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })} placeholder="Enter your phone number" type="tel" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" value={registrationData.email} onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })} placeholder="Enter your email address" type="email" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsRegistrationOpen(false)} className="flex-1" disabled={eventRegistration.isPending}>Cancel</Button>
                  <Button onClick={handleEventRegistration} className="flex-1 bg-orange-500 hover:bg-orange-600" disabled={eventRegistration.isPending}>
                    {eventRegistration.isPending ? (<><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> Registering...</>) : (<><UserPlus className="h-4 w-4 mr-2" /> Register</>)}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Events;

