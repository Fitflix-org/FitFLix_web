import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShareButton } from '@/components/ShareButton';
import OptimizedImage from '@/components/OptimizedImage';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import { blogApi, Blog } from '@/lib/api/api';
import 'highlight.js/styles/github-dark.css';



const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  // Load blog data from API
  useEffect(() => {
    const loadBlog = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const blogData = await blogApi.getBySlug(slug);
        setBlog(blogData);
        
        // Load related blogs (for now, just get all published blogs)
        const relatedResponse = await blogApi.getPublished();
        const related = relatedResponse.blogs.filter(b => b.slug !== slug).slice(0, 3);
        setRelatedBlogs(related);
      } catch (error) {
        console.error('Failed to load blog:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorName = () => {
    return "Fitflix Team";
  };

  const getReadingTime = (content: string | undefined) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-slate-600">Loading blog post...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog || !blog.content) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Blog Post Not Found</h1>
            <p className="text-slate-600 mb-6">The blog post you're looking for doesn't exist or is missing content.</p>
            <Link to="/blogs">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription || blog.excerpt} />
        <meta name="keywords" content={blog.metaKeywords} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={blog.metaTitle || blog.title} />
        <meta property="og:description" content={blog.metaDescription || blog.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://fitflix.com/blogs/${blog.slug}`} />
        <meta property="og:image" content={blog.coverImage || '/media/fitflix-icon.png'} />
        <meta property="article:published_time" content={blog.createdAt} />
        <meta property="article:author" content={getAuthorName()} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.metaTitle || blog.title} />
        <meta name="twitter:description" content={blog.metaDescription || blog.excerpt} />
        <meta name="twitter:image" content={blog.coverImage || '/media/fitflix-icon.png'} />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "description": blog.excerpt,
            "image": blog.coverImage,
            "author": {
              "@type": "Person",
              "name": getAuthorName()
            },
            "publisher": {
              "@type": "Organization",
              "name": "Fitflix",
              "logo": {
                "@type": "ImageObject",
                "url": "https://fitflix.com/media/fitflix-icon.png"
              }
            },
            "datePublished": blog.createdAt,
            "dateModified": blog.updatedAt || blog.createdAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://fitflix.com/blogs/${blog.slug}`
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Back Navigation */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Link to="/blogs" className="inline-flex items-center text-slate-600 hover:text-slate-500 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="text-sm text-slate-500 mb-6">
                <Link to="/" className="hover:text-slate-600">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/blogs" className="hover:text-slate-600">Blogs</Link>
                <span className="mx-2">/</span>
                <span className="text-slate-900">{blog.title}</span>
              </nav>

              {/* Article Header */}
              <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight tracking-tight font-serif">
                  {blog.title}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 mb-8">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">By {getAuthorName()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{getReadingTime(blog.content || '')} min read</span>
                  </div>
                </div>

                {blog.excerpt && (
                  <p className="text-xl text-slate-600 leading-relaxed mb-8">
                    {blog.excerpt}
                  </p>
                )}
                
                <div className="flex justify-center">
                  <ShareButton 
                    title={blog.title}
                    url={window.location.href}
                    text={blog.excerpt}
                  />
                </div>
              </div>

              {/* Cover Image */}
              {blog.coverImage && (
                <div className="mb-8 rounded-2xl overflow-hidden">
                  <OptimizedImage
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-64 md:h-96 object-cover"
                    width={800}
                    height={400}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-sm prose-gray mx-auto max-w-none prose-enhanced
                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-2xl prose-h1:mb-4 prose-h1:leading-tight
                prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:leading-tight
                prose-h3:text-lg prose-h3:mb-3 prose-h3:mt-4 prose-h3:leading-tight
                prose-h4:text-base prose-h4:mb-2 prose-h4:mt-3 prose-h4:leading-tight
                prose-h5:text-sm prose-h5:mb-1 prose-h5:mt-2 prose-h5:leading-tight
                prose-h6:text-xs prose-h6:mb-1 prose-h6:mt-2 prose-h6:leading-tight
                prose-p:text-gray-700 prose-p:leading-none prose-p:mb-1 prose-p:text-base
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-em:text-gray-800 prose-em:italic
                prose-a:text-orange-500 prose-a:no-underline prose-a:font-medium hover:prose-a:text-orange-600 hover:prose-a:underline
                prose-ul:text-gray-700 prose-ul:leading-none prose-ul:mb-1
                prose-ol:text-gray-700 prose-ol:leading-none prose-ol:mb-1
                prose-li:text-gray-700 prose-li:leading-none prose-li:mb-0
                prose-blockquote:text-gray-600 prose-blockquote:border-l-4 prose-blockquote:border-orange-200 prose-blockquote:pl-3 prose-blockquote:py-1 prose-blockquote:my-3 prose-blockquote:bg-slate-50 prose-blockquote:rounded-r-lg
                prose-code:text-gray-800 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono
                prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-3 prose-pre:rounded-md prose-pre:overflow-x-auto prose-pre:my-3 prose-pre:shadow-sm
                prose-pre:prose-code:bg-transparent prose-pre:prose-code:text-inherit prose-pre:prose-code:p-0 prose-pre:prose-code:rounded-none
                prose-img:rounded-md prose-img:shadow-sm prose-img:mx-auto prose-img:my-3 prose-img:max-w-full prose-img:h-auto
                prose-hr:border-slate-200 prose-hr:my-4
                prose-table:border-collapse prose-table:w-full prose-table:my-3
                prose-th:border prose-th:border-slate-300 prose-th:bg-slate-50 prose-th:px-2 prose-th:py-1 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900
                prose-td:border prose-td:border-slate-300 prose-td:px-2 prose-td:py-1 prose-td:text-gray-700
                [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                [&>p:empty]:hidden
                [&>h1+h2]:mt-1 [&>h1+h3]:mt-1 [&>h1+h4]:mt-1 [&>h1+h5]:mt-1 [&>h1+h6]:mt-1
                [&>h2+h3]:mt-1 [&>h2+h4]:mt-1 [&>h2+h5]:mt-1 [&>h2+h6]:mt-1
                [&>h3+h4]:mt-1 [&>h3+h5]:mt-1 [&>h3+h6]:mt-1
                [&>h4+h5]:mt-1 [&>h4+h6]:mt-1
                [&>h5+h6]:mt-1
                [&>p+p]:mt-1
                [&>ul+ul]:mt-0 [&>ol+ol]:mt-0
                [&>ul+p]:mt-1 [&>ol+p]:mt-1
                [&>p+ul]:mt-1 [&>p+ol]:mt-1
                [&>blockquote+p]:mt-1 [&>p+blockquote]:mt-1
                [&>h1+p]:mt-1 [&>h2+p]:mt-1 [&>h3+p]:mt-1 [&>h4+p]:mt-1 [&>h5+p]:mt-1 [&>h6+p]:mt-1
                [&>p+h1]:mt-4 [&>p+h2]:mt-3 [&>p+h3]:mt-2 [&>p+h4]:mt-2 [&>p+h5]:mt-2 [&>p+h6]:mt-2
                [&>ul+h1]:mt-4 [&>ul+h2]:mt-3 [&>ul+h3]:mt-2 [&>ul+h4]:mt-2 [&>ul+h5]:mt-2 [&>ul+h6]:mt-2
                [&>ol+h1]:mt-4 [&>ol+h2]:mt-3 [&>ol+h3]:mt-2 [&>ol+h4]:mt-2 [&>ol+h5]:mt-2 [&>ol+h6]:mt-2
                [&>blockquote+h1]:mt-4 [&>blockquote+h2]:mt-3 [&>blockquote+h3]:mt-2 [&>blockquote+h4]:mt-2 [&>blockquote+h5]:mt-2 [&>blockquote+h6]:mt-2
                [&>h1+ul]:mt-2 [&>h2+ul]:mt-2 [&>h3+ul]:mt-2 [&>h4+ul]:mt-2 [&>h5+ul]:mt-2 [&>h6+ul]:mt-2
                [&>h1+ol]:mt-2 [&>h2+ol]:mt-2 [&>h3+ol]:mt-2 [&>h4+ol]:mt-2 [&>h5+ol]:mt-2 [&>h6+ol]:mt-2
                [&>h1+blockquote]:mt-2 [&>h2+blockquote]:mt-2 [&>h3+blockquote]:mt-2 [&>h4+blockquote]:mt-2 [&>h5+blockquote]:mt-2 [&>h6+blockquote]:mt-2">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeSanitize]}
                >
                  {blog.content}
                </ReactMarkdown>
              </div>

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-slate-600">Share this article:</span>
                    <ShareButton 
                      title={blog.title}
                      url={window.location.href}
                      text={blog.excerpt}
                    />
                  </div>
                  
                  {blog.metaKeywords && blog.metaKeywords.trim() && (
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-slate-500" />
                      <div className="flex flex-wrap gap-2">
                        {blog.metaKeywords.split(',').map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="bg-slate-50">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                  Related Fitness Articles
                </h2>
                
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {relatedBlogs.map((relatedBlog) => (
                    <Card key={relatedBlog.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="relative overflow-hidden">
                        {relatedBlog.coverImage && (
                          <OptimizedImage
                            src={relatedBlog.coverImage}
                            alt={relatedBlog.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            width={400}
                            height={300}
                          />
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-slate-600 mb-4 line-clamp-3">
                          {relatedBlog.excerpt || 'No excerpt available'}
                        </p>
                        <Link 
                          to={`/blogs/${relatedBlog.slug}`}
                          className="inline-flex items-center text-orange-500 hover:text-orange-600 font-semibold"
                        >
                          Read More
                          <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-orange-500 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Fitness Journey?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join Fitflix today and get access to premium gyms, expert trainers, and personalized fitness plans in Bangalore.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/discover-gym">
                  <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-slate-100">
                    Find a Gym Near You
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                    Learn More About Fitflix
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
