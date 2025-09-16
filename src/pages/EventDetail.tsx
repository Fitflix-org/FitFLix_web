import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, MapPin, Trophy, Heart, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import OptimizedImage from '@/components/OptimizedImage';
import { eventApi, Event } from '@/lib/api/api';
import { useToast } from '@/hooks/use-toast';

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await eventApi.getById(id);
        setEvent(data);
      } catch (err) {
        console.error('Failed to fetch event', err);
        toast({ title: 'Error', description: 'Failed to load event', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id, toast]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    if (!form.name || !form.email || !form.phone) {
      toast({ title: 'Missing info', description: 'Please fill all fields', variant: 'destructive' });
      return;
    }
    try {
      setSubmitting(true);
      await eventApi.register(event.id, form);
      toast({ title: 'Registered', description: 'We will contact you soon.' });
      setForm({ name: '', email: '', phone: '' });
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Registration failed', description: (err as Error).message || 'Try again.' , variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center">Event not found</div>;
  }

  const dt = new Date(event.date);
  const details = event.details ?? ({} as any);
  
  // Normalize descriptionBlocks: accept objects, JSON strings, or plain strings
  const rawBlocks = (event as any).descriptionBlocksRich && Array.isArray((event as any).descriptionBlocksRich)
    ? (event as any).descriptionBlocksRich
    : event.descriptionBlocks;
  const hasBlocks = Array.isArray(rawBlocks) && rawBlocks.length > 0;
  const structuredUsed = hasBlocks && rawBlocks!.some((b: any) => typeof b === 'object' || (typeof b === 'string' && b.trim().startsWith('{')));
  const normalizedBlocks: Array<{ title?: string; description?: string; items?: string[] }> = hasBlocks
    ? rawBlocks!.map((block: any) => {
        if (typeof block === 'string') {
          const s = block.trim();
          if (s.startsWith('{')) {
            try {
              const parsed = JSON.parse(s);
            if (parsed && (typeof parsed.title === 'string' || typeof parsed.description === 'string' || Array.isArray(parsed.items))) {
              return { title: parsed.title, description: parsed.description, items: parsed.items };
              }
            } catch (_) {
              // fall through to treat as plain text
            }
          }
        return { description: block };
        }
      return { title: block.title, description: block.description, items: Array.isArray(block.items) ? block.items : undefined };
      })
    : [];
  const deriveTitles = () => {
    // Use the new database fields first, fallback to details, then split main title
    const t1 = event.title1 || (details as any)?.title1;
    const t2 = event.title2 || (details as any)?.title2;
    const t3 = event.title3 || (details as any)?.title3;
    
    if (t1 || t2 || t3) return { title1: t1 || event.title, title2: t2, title3: t3 };
    
    const parts = event.title.split(/[|–-]+/).map(s => s.trim()).filter(Boolean);
    return { title1: parts[0] || event.title, title2: parts[1], title3: parts[2] };
  };
  const { title1, title2, title3 } = deriveTitles();
  

  return (

    <div className="min-h-screen bg-white align-text-bottom text-slate-900">
      <Helmet>
        <title>{event.title} | Fitflix</title>
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.description.slice(0, 150)} />
        <meta property="og:image" content={event.imageUrls?.[0] || event.coverImage || '/fitflix-logo.png'} />
        <meta property="og:url" content={`https://fitflix.in/events/${event.id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Fitflix" />
        <meta property="og:locale" content="en_US" />
        <meta name="description" content={event.description.slice(0, 150)} />
      </Helmet>
      {/* Hero (Background image with centered titles, description, meta, and CTA) */}
      <section
        className="relative mt-16 h-[calc(100vh-4rem)] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/media/SainikPuriEvent.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-full h-full max-w-5xl mx-auto px-4 text-center text-white flex flex-col items-center justify-center">
          {title1 && (
            <h1 className="text-white text-5xl sm:text-7xl md:text-8xl font-extrabold leading-tight drop-shadow-lg whitespace-nowrap">
              {title1}
            </h1>
          )}
          {title2 && (
            <div className="mt-6 text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow whitespace-nowrap">
              {title2}
            </div>
          )}
          {title3 && (
            <div className="mt-4 text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow whitespace-nowrap">
              {title3}
            </div>
          )}
          {event.description && (
            <p className="mt-4 max-w-3xl mx-auto text-white/90 text-base sm:text-lg">
              {event.description}
            </p>
          )}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-center text-white/90">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
          <Button
            size="lg"
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Register Now
          </Button>
        </div>
      </section>

      {/* Event Details Cards - prefer structured descriptionBlocks, fallback to event.details */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Event <span className="text-orange-400">Details</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {structuredUsed && normalizedBlocks.length > 0 ? (
            normalizedBlocks.map((b, idx) => {
              const icon = idx === 0 ? <Trophy className="w-8 h-8 text-orange-400 mb-2" aria-hidden="true" />
                         : idx === 1 ? <Heart className="w-8 h-8 text-orange-400 mb-2" aria-hidden="true" />
                         : <Users className="w-8 h-8 text-orange-400 mb-2" aria-hidden="true" />;
              return (
                <Card key={idx} className="bg-gray-800 border-gray-700 text-white rounded-xl shadow-sm">
                  <CardContent className="p-6">
                    {icon}
                    {b.title && <div className="font-semibold mb-2">{b.title}</div>}
                    {b.items && b.items.length > 0 ? (
                      <ul className="text-gray-300 space-y-2">
                        {b.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    ) : (
                      b.description && (
                        <div className="text-gray-300 space-y-2 whitespace-pre-line">
                          {b.description}
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <>
              {Array.isArray(details.included) && details.included.length > 0 && (
                <Card className="bg-gray-800 border-gray-700 text-white rounded-xl shadow-sm">
                  <CardContent className="p-6">
                    <Trophy className="w-8 h-8 text-orange-400 mb-2" aria-hidden="true" />
                    <div className="font-semibold mb-2">What's Included</div>
                    <ul className="text-gray-300 space-y-2">
                      {details.included.map((item: string, idx: number) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {Array.isArray(details.benefits) && details.benefits.length > 0 && (
                <Card className="bg-gray-800 border-gray-700 text-white rounded-xl shadow-sm">
                  <CardContent className="p-6">
                    <Heart className="w-8 h-8 text-orange-400 mb-2" aria-hidden="true" />
                    <div className="font-semibold mb-2">Health Benefits</div>
                    <ul className="text-gray-300 space-y-2">
                      {details.benefits.map((item: string, idx: number) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {Array.isArray(details.schedule) && details.schedule.length > 0 && (
                <Card className="bg-gray-800 border-gray-700 text-white rounded-xl shadow-sm">
                  <CardContent className="p-6">
                    <Users className="w-8 h-8 text-orange-400 mb-2" aria-hidden="true" />
                    <div className="font-semibold mb-2">Event Schedule</div>
                    <ul className="text-gray-300 space-y-2">
                      {details.schedule.map((item: string, idx: number) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>

        {!structuredUsed && details.routeInfo && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Route Information</h3>
            <p className="text-gray-300 max-w-3xl mx-auto">
              {details.routeInfo}
            </p>
          </div>
        )}
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        {/* Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">About this event</h2>
              {hasBlocks ? (
                structuredUsed ? (
                  // Avoid duplicating structured blocks shown above
                  <p className="leading-relaxed text-slate-900 whitespace-pre-line">{event.description}</p>
                ) : (
                  // Legacy: string-only blocks rendered as info cards
                  <div className="space-y-4">
                    {normalizedBlocks.map((b, idx) => (
                      <Card key={idx} className="bg-gray-50 border-l-4 border-l-orange-500">
                        <CardContent className="p-4">
                          {b.title && <h3 className="text-lg font-semibold mb-2">{b.title}</h3>}
                          {b.description && (
                            <p className="leading-relaxed text-slate-900 whitespace-pre-line">{b.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )
              ) : (
                <p className="leading-relaxed text-slate-900 whitespace-pre-line">{event.description}</p>
              )}
            </CardContent>
          </Card>

          {Array.isArray(event.imageUrls) && event.imageUrls.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {event.imageUrls.map((url, idx) => (
                    <OptimizedImage key={idx} src={url} alt={`event image ${idx + 1}`} width={400} height={300} className="w-full h-32 object-cover rounded" />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Registration */}
        <div id="register">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Register</h2>
              <form onSubmit={onRegister} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={form.name} onChange={onChange} placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={form.phone} onChange={onChange} placeholder="9876543210" />
                </div>
                <Button type="submit" disabled={submitting} className="w-full">{submitting ? 'Submitting…' : (event.entryFee ? `Register (₹${event.entryFee})` : 'Register - Free')}</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;


