import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * SubdomainRedirect Component
 * 
 * Handles subdomain-based redirects for the Fitflix application.
 * When a user visits blogs.fitflix.in, they are automatically redirected to /blogs
 * to load the blogs page directly.
 */
const SubdomainRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we're on the blogs subdomain
    const hostname = window.location.hostname;
    
    if (hostname === 'blogs.fitflix.in') {
      // Only redirect if we're on the root path "/"
      if (location.pathname === '/') {
        console.log('Subdomain redirect: blogs.fitflix.in -> /blogs');
        navigate('/blogs', { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  // This component doesn't render anything
  return null;
};

export default SubdomainRedirect;

