import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import OptimizedImage from '@/components/OptimizedImage';
import { Helmet } from 'react-helmet-async';
import { blogApi, Blog } from '@/services/api';



const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Load blogs from API
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogApi.getPublished();
        setBlogs(response.blogs);
      } catch (error) {
        console.error('Failed to load blogs:', error);
        // Fallback to empty array if API fails
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-slate-600">Loading fitness blogs...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Fitness & Wellness Blogs in Bangalore - Expert Tips & Guides | Fitflix</title>
        <meta name="description" content="Discover expert fitness tips, workout guides, and wellness advice for Bangalore. From beginner workouts to advanced training, get the latest insights from Fitflix fitness experts." />
        <meta name="keywords" content="fitness blogs bangalore, workout tips bangalore, wellness advice bangalore, gym guides bangalore, fitness tips bangalore, health blogs bangalore" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Fitness & Wellness Blogs in Bangalore - Expert Tips & Guides | Fitflix" />
        <meta property="og:description" content="Discover expert fitness tips, workout guides, and wellness advice for Bangalore. From beginner workouts to advanced training, get the latest insights from Fitflix fitness experts." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fitflix.com/blogs" />
        <meta property="og:image" content="/media/fitflix-final-png-4 (1).png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fitness & Wellness Blogs in Bangalore - Expert Tips & Guides | Fitflix" />
        <meta name="twitter:description" content="Discover expert fitness tips, workout guides, and wellness advice for Bangalore. From beginner workouts to advanced training, get the latest insights from Fitflix fitness experts." />
        <meta name="twitter:image" content="/media/fitflix-final-png-4 (1).png" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Fitflix Fitness & Wellness Blog",
            "description": "Expert fitness tips, workout guides, and wellness advice for Bangalore and beyond",
            "url": "https://fitflix.com/blogs",
            "publisher": {
              "@type": "Organization",
              "name": "Fitflix",
              "logo": {
                "@type": "ImageObject",
                "url": "https://fitflix.com/media/fitflix-final-png-4 (1).png"
              }
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": blogs.map((blog, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "BlogPosting",
                  "headline": blog.title,
                  "description": blog.excerpt,
                  "url": `https://fitflix.com/blogs/${blog.slug}`,
                  "datePublished": blog.createdAt,
                  "author": {
                    "@type": "Person",
                    "name": "Fitflix Team"
                  }
                }
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <div className="bg-orange-500 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-black mb-6 text-white">
                Fitness & Wellness Blog
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-orange-100">
                Expert tips, workout guides, and wellness advice for your fitness journey in Bangalore
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 text-white border-white/30">
                  Best Gym in Bangalore
                </Badge>
                <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 text-white border-white/30">
                  Fitness in Bangalore
                </Badge>
                <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 text-white border-white/30">
                  Wellness Centers
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-5 w-5" />
                  <Input
                    placeholder="Search fitness tips, workouts, and wellness advice..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-lg py-3 text-slate-600"
                  />
                </div>
              </div>
            </div>
          </div>



          {/* Blog Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <Card key={blog.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  {blog.coverImage && (
                    <OptimizedImage
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={300}
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-orange-500 text-white border-orange-500">
                      Fitness Tips
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                                  <div className="flex items-center space-x-4 text-sm text-white mb-3">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>Fitflix Team</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-white mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                  
                  <div className="mt-4">
                    <Link 
                      to={`/blogs/${blog.slug}`}
                      className="inline-flex items-center text-orange-500 hover:text-orange-600 font-semibold group-hover:translate-x-1 transition-transform"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No blogs found</h3>
              <p className="text-slate-600">Try adjusting your search terms or check back later for new fitness content.</p>
            </div>
          )}

          {/* SEO Content Section */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              Your Ultimate Fitness Resource in Bangalore
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Why Choose Fitflix for Fitness in Bangalore?
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Expert trainers and certified fitness professionals</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>State-of-the-art equipment and modern facilities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Personalized workout plans and nutrition guidance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Convenient locations across Bangalore</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Popular Fitness Topics in Bangalore
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Best gym in Bangalore',
                    'Fitness in Bangalore',
                    'Wellness centers in Bangalore',
                    'Premium gyms in Bangalore',
                    'Workout and nutrition tips',
                    'Cryotherapy and wellness services',
                    'Electronic City gyms',
                    'Marathahalli fitness centers'
                  ].map((topic) => (
                    <Badge key={topic} variant="outline" className="text-sm text-gray-700">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
