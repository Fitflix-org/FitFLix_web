
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Heart, Trophy, Users, Award, Star } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Sarah Chen",
      role: "Head of Fitness",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9a0a9e7?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Mike Rodriguez",
      role: "Tech Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Premium Gym Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop')"
        }}
      />
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30">About FitPulse</Badge>
            <h1 className="text-4xl md:text-6xl font-black gradient-text mb-6">
              About Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              We help our clients fill more pools and aquatic centers and improve their customer experience.
              FitPulse is a team of passionate fitness enthusiasts and technology experts dedicated to revolutionizing 
              how people approach health and wellness in the digital age.
            </p>
          </div>

          {/* Team Photo & Description */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-1">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                  alt="FitPulse Team" 
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                We understand that true fitness transformation goes beyond just tracking workouts. Our comprehensive platform 
                combines advanced analytics, personalized recommendations, and community engagement to create lasting change.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Since our founding, we've helped thousands of individuals discover their potential, connect with fitness communities, 
                and achieve goals they never thought possible. Every feature we build is designed with one purpose: empowering you 
                to live your healthiest, most active life.
              </p>
              <button className="btn-fitness px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                Join Our Mission
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="text-5xl font-black text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Partner Gyms</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-primary mb-2">600+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-primary mb-2">7+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>

          {/* Founder Vision */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 mb-20 border border-primary/10 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-32 h-32 mx-auto lg:mx-0 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face" 
                    alt="Founder" 
                    className="w-full h-full object-cover rounded-full border-4 border-primary/20"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-primary">Our Vision - Message From Founder</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "When I started FitPulse, my vision was simple yet ambitious: create a platform that doesn't just track fitness, 
                  but transforms lives. Having struggled with my own fitness journey, I understood the frustration of scattered apps, 
                  lack of community, and one-size-fits-all approaches."
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  "Today, seeing our community thrive and achieve their goals makes every challenge worthwhile. 
                  This is just the beginning of our mission to democratize fitness for everyone."
                </p>
                <div className="mt-6">
                  <div className="font-semibold">Alex Johnson</div>
                  <div className="text-sm text-primary">CEO & Founder, FitPulse</div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Team */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate individuals behind FitPulse who work tirelessly to bring you the best fitness experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 bg-gradient-to-b from-background/80 to-primary/5 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full border-3 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Target, title: "Mission Driven", description: "Empowering fitness transformation through technology" },
              { icon: Heart, title: "Health First", description: "Prioritizing sustainable wellness practices" },
              { icon: Trophy, title: "Excellence", description: "Delivering the highest quality fitness solutions" },
              { icon: Users, title: "Community", description: "Building supportive fitness networks" }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30 bg-gradient-to-b from-background/80 to-primary/5 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 border border-primary/20 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fitness Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our growing community of fitness enthusiasts and discover what makes FitPulse the ultimate fitness companion.
            </p>
            <button className="btn-fitness px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
              Start Your Journey Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
