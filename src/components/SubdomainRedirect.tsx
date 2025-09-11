import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * SubdomainRedirect Component
 * 
 * Handles subdomain-based redirects for the Fitflix application.
 * When a user visits /blogs on the main site, they are redirected to blogs.fitflix.in
 */
const SubdomainRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hostname = window.location.hostname;
    
    // Redirect /blogs to the dedicated blog subdomain
    if (hostname === 'fitflix.in' && location.pathname === '/blogs') {
      console.log('Redirecting /blogs to blogs.fitflix.in');
      window.location.href = 'https://blogs.fitflix.in';
      return;
    }
    
    // Also redirect individual blog posts
    if (hostname === 'fitflix.in' && location.pathname.startsWith('/blogs/')) {
      const slug = location.pathname.replace('/blogs/', '');
      console.log(`Redirecting /blogs/${slug} to blogs.fitflix.in/blogs/${slug}`);
      window.location.href = `https://blogs.fitflix.in/blogs/${slug}`;
      return;
    }
  }, [navigate, location.pathname]);

  // This component doesn't render anything
  return null;
};

export default SubdomainRedirect;






