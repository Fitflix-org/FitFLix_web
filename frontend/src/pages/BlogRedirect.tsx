import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * BlogRedirect Component
 * 
 * This component handles the redirect from /blogs to blogs.fitflix.in
 * It shows a loading message while the redirect happens.
 */
const BlogRedirect = () => {
  useEffect(() => {
    // Redirect to the blog subdomain
    window.location.href = 'https://blogs.fitflix.in';
  }, []);

  return (
    <>
      <Helmet>
        <title>Redirecting to Fitflix Blog...</title>
        <meta httpEquiv="refresh" content="0; url=https://blogs.fitflix.in" />
      </Helmet>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Redirecting to Fitflix Blog...
          </h1>
          <p className="text-slate-600 mb-4">
            Taking you to our dedicated blog platform
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-sm text-slate-500 mt-4">
            If you're not redirected automatically, 
            <a href="https://blogs.fitflix.in" className="text-orange-500 hover:text-orange-600 ml-1">
              click here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogRedirect;

