import React, { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import OptimizedImage from '@/components/OptimizedImage';
import { leadService, LeadSubmission } from '@/lib/services/leadService';
import { Building2, Users, MapPin, Mail, Phone, CheckCircle, ArrowRight } from 'lucide-react';

const CorporateWellness: React.FC = () => {
  useSEO({
    title: 'Corporate Wellness Partnerships | Fitflix',
    description: 'Transform your workplace with Fitflix corporate wellness programs designed for modern Indian companies.',
    keywords: 'corporate wellness, employee fitness, India, Fitflix, workplace health',
    ogTitle: 'Corporate Wellness Partnerships | Fitflix',
    ogDescription: 'Transform your workplace with our comprehensive corporate wellness programs designed for modern Indian companies.',
    canonical: 'https://fitflix.in/corporate-wellness'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    teamSize: '',
    city: '',
    interest: 'Corporate wellness partnerships',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const interestOptions = [
    'Corporate wellness partnerships',
    'On-site fitness programs',
    'Virtual/Hybrid wellness programs',
    'Workshops & seminars',
    'Annual offsites & events'
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const payload: LeadSubmission = {
        name: formData.name,
        email: formData.email || undefined,
        phone: formData.phone,
        location: formData.city || undefined,
        source: 'corporate-wellness',
        interest: `${formData.interest} — Company: ${formData.company || 'N/A'}, Team Size: ${formData.teamSize || 'N/A'}, City: ${formData.city || 'N/A'}`,
      };

      const result = await leadService.submitLead(payload);
      if (result.success) {
        setSubmitMessage('Thanks! Our corporate team will contact you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', company: '', teamSize: '', city: '', interest: 'Corporate wellness partnerships' });
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch (err) {
      setSubmitMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4 text-sm font-medium text-primary">Corporate Wellness</div>
              <h1 className="text-4xl md:text-6xl font-black mb-6">
                Transform Your <span className="text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text">Workplace</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Transform your workplace with our comprehensive corporate wellness programs designed for modern Indian companies.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'End-to-end wellness: assessments, training, recovery, nutrition',
                  'On-site, hybrid and remote program delivery',
                  'Data-driven progress tracking and engagement',
                  'Rooted in India’s movement and healing systems'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#enquire" className="inline-flex items-center gap-2 btn-fitness px-6 py-3 rounded-md">
                Enquire Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-2 backdrop-blur-sm border border-primary/20">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&h=600&fit=crop"
                  alt="Corporate Wellness"
                  className="w-full h-[380px] object-cover rounded-2xl"
                  width={900}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="enquire" className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Corporate Wellness Enquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <Input id="company" value={formData.company} onChange={(e) => handleChange('company', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Team Size</Label>
                      <Input id="teamSize" value={formData.teamSize} onChange={(e) => handleChange('teamSize', e.target.value)} placeholder="e.g., 50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <Input id="city" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} placeholder="e.g., Bengaluru" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Interest *</Label>
                    <Select value={formData.interest} onValueChange={(v) => handleChange('interest', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interest" />
                      </SelectTrigger>
                      <SelectContent>
                        {interestOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-muted-foreground">
                      You are showing interest in: <span className="font-medium text-foreground">{formData.interest}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button type="submit" className="flex-1" disabled={!formData.name || !formData.phone || isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                    </Button>
                  </div>

                  {submitMessage && (
                    <p className={`text-sm ${submitMessage.toLowerCase().includes('thanks') ? 'text-green-600' : 'text-red-500'}`}>{submitMessage}</p>
                  )}
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Email</div>
                      <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4" /> corp@fitflix.in</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Phone</div>
                      <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4" /> 7026000465</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Typical response</div>
                      <div className="text-sm">Within 24 hours</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Program Outcomes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Higher employee engagement & retention</div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Reduced absenteeism and burnout</div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Improved energy, mobility, and resilience</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorporateWellness;


