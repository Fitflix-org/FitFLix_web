import { config } from '../config';

export interface LeadSubmission {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  source: string;
  interest?: string;
  gymId?: number | null;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  data?: any;
}

class LeadService {
  // Use the centralized config for backend URL
  private baseUrl = `${config.api.baseUrl}/api/leads`;

  async submitLead(leadData: LeadSubmission): Promise<LeadResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit lead');
      }

      return result;
    } catch (error) {
      console.error('Error submitting lead:', error);
      throw error;
    }
  }

  async getLeads(page: number = 1, limit: number = 20, status?: string, source?: string): Promise<any> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (status && status !== 'all') params.append('status', status);
      if (source && source !== 'all') params.append('source', source);

      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch leads');
      }

      return result;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  }

  async updateLeadStatus(leadId: string, status: string, notes?: string): Promise<LeadResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, notes }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update lead status');
      }

      return result;
    } catch (error) {
      console.error('Error updating lead status:', error);
      throw error;
    }
  }

  async deleteLead(leadId: string): Promise<LeadResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${leadId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete lead');
      }

      return result;
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  }
}

export const leadService = new LeadService();
