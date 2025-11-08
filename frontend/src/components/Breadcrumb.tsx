import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

const Breadcrumb = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' }
    ];

    let currentPath = '';
    
    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;
      
      // Customize labels for specific routes
      let label = name;
      if (name === 'discover-gym') {
        label = 'Discover Gyms';
      } else if (name === 'gym') {
        label = 'Gym Details';
      } else if (name === 'about') {
        label = 'About Us';
      } else if (name === 'sitemap') {
        label = 'Sitemap';
      } else if (name === 'services') {
        label = 'Services';
      } else {
        // Capitalize first letter and replace hyphens with spaces
        label = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
      }

      breadcrumbs.push({
        label,
        path: currentPath,
        isActive: index === pathnames.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumb on home page
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index === 0 ? (
            <Link
              to={breadcrumb.path}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          ) : (
            <Link
              to={breadcrumb.path}
              className={`hover:text-foreground transition-colors ${
                breadcrumb.isActive ? 'text-foreground font-medium' : ''
              }`}
            >
              {breadcrumb.label}
            </Link>
          )}
          
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
