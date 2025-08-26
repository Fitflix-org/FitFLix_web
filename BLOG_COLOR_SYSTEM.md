# Fitflix Blog Color System

This document outlines the consistent color palette for all blog-related components in the Fitflix application.

## Color Tokens

### Primary Colors
- **Primary**: `#1E293B` - Dark blue-gray for main elements, headings, and primary content
- **Secondary**: `#64748B` - Medium blue-gray for secondary elements and supporting text
- **Accent**: `#F97316` - Orange for highlights, CTAs, and interactive elements

### Background Colors
- **Background**: `#FFFFFF` - White for main backgrounds and content areas
- **Surface**: `#F1F5F9` - Light gray for surface backgrounds, cards, and secondary areas

### Text Colors
- **Text**: `#0F172A` - Dark text for headings and primary content
- **Muted Text**: `#475569` - Medium gray for secondary text, captions, and metadata

### Border Colors
- **Border**: `#CBD5E1` - Light gray for borders, dividers, and separators

### Interactive States
- **Hover**: `#EA580C` - Darker orange for hover states
- **Active**: `#C2410C` - Even darker orange for active/pressed states

## Usage Guidelines

### 1. Text Colors
```tsx
// Headings and primary content
<h1 className="text-slate-900">Blog Title</h1>

// Secondary text and metadata
<p className="text-slate-600">Author • Date • Reading Time</p>

// Muted text for less important information
<span className="text-slate-500">Category tags</span>
```

### 2. Background Colors
```tsx
// Main content areas
<div className="bg-white">Content</div>

// Surface backgrounds
<div className="bg-slate-50">Card background</div>

// Hero sections
<div className="bg-orange-500">Hero content</div>
```

### 3. Interactive Elements
```tsx
// Links and CTAs
<Link className="text-orange-500 hover:text-orange-600">
  Read More
</Link>

// Buttons
<Button className="bg-orange-500 hover:bg-orange-600">
  Subscribe
</Button>
```

### 4. Status Badges
```tsx
// Use semantic colors for status
const statusColors = {
  DRAFT: 'bg-yellow-100 text-yellow-800',
  PUBLISHED: 'bg-green-100 text-green-800',
  ARCHIVED: 'bg-slate-100 text-slate-800'
};
```

## Implementation

### CSS Variables
The color tokens are available as CSS custom properties:

```css
:root {
  --blog-primary: #1E293B;
  --blog-secondary: #64748B;
  --blog-accent: #F97316;
  --blog-background: #FFFFFF;
  --blog-surface: #F1F5F9;
  --blog-text: #0F172A;
  --blog-muted-text: #475569;
  --blog-border: #CBD5E1;
  --blog-hover: #EA580C;
  --blog-active: #C2410C;
}
```

### Tailwind Classes
Use these Tailwind classes for consistent styling:

```tsx
// Text colors
text-slate-900    // Primary text
text-slate-600    // Secondary text
text-slate-500    // Muted text
text-orange-500   // Accent text

// Background colors
bg-white          // Main background
bg-slate-50      // Surface background
bg-orange-500    // Accent background

// Border colors
border-slate-200  // Borders and dividers
```

### Dark Mode Support
The color system automatically adapts to dark mode:

```css
.dark {
  --blog-primary: #F1F5F9;
  --blog-secondary: #CBD5E1;
  --blog-background: #0F172A;
  --blog-surface: #1E293B;
  --blog-text: #F8FAFC;
  --blog-muted-text: #CBD5E1;
  --blog-border: #475569;
}
```

## Component Examples

### Blog Card
```tsx
<Card className="bg-white border border-slate-200 hover:shadow-lg">
  <CardContent className="p-6">
    <h3 className="text-xl font-bold text-slate-900 mb-3">
      {blog.title}
    </h3>
    <p className="text-slate-600 mb-4">
      {blog.excerpt}
    </p>
    <Link className="text-orange-500 hover:text-orange-600">
      Read More
    </Link>
  </CardContent>
</Card>
```

### Blog Header
```tsx
<div className="bg-white border-b border-slate-200">
  <div className="container mx-auto px-4 py-4">
    <nav className="text-sm text-slate-500">
      <Link className="hover:text-slate-600">Home</Link>
      <span className="mx-2">/</span>
      <Link className="hover:text-slate-600">Blogs</Link>
    </nav>
  </div>
</div>
```

### Search Input
```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 text-slate-500 h-5 w-5" />
  <Input
    placeholder="Search blogs..."
    className="pl-10 text-slate-600 border-slate-200"
  />
</div>
```

## Migration Guide

### Before (Hardcoded Colors)
```tsx
// ❌ Don't use hardcoded colors
<div className="bg-[#F9FAFB] text-[#1A1A1A]">
  <h1 className="text-[#FF6B00]">Title</h1>
</div>
```

### After (Semantic Colors)
```tsx
// ✅ Use semantic color classes
<div className="bg-slate-50 text-slate-900">
  <h1 className="text-orange-500">Title</h1>
</div>
```

### Color Mapping
| Old Color | New Color | Usage |
|-----------|-----------|-------|
| `#F9FAFB` | `bg-slate-50` | Surface backgrounds |
| `#FFFFFF` | `bg-white` | Main backgrounds |
| `#1A1A1A` | `text-slate-900` | Primary text |
| `#444444` | `text-slate-600` | Secondary text |
| `#6B7280` | `text-slate-500` | Muted text |
| `#FF6B00` | `text-orange-500` | Accent text |
| `#E5E7EB` | `border-slate-200` | Borders |

## Best Practices

1. **Consistency**: Always use the defined color tokens
2. **Semantic Meaning**: Choose colors based on their purpose, not appearance
3. **Accessibility**: Ensure sufficient contrast ratios (4.5:1 minimum)
4. **Dark Mode**: Test both light and dark themes
5. **Maintenance**: Update colors in one place (color tokens file)

## Files Updated

- `src/lib/colors.ts` - Color token definitions
- `src/pages/Blogs.tsx` - Main blogs listing page
- `src/pages/BlogDetail.tsx` - Individual blog post page
- `Admin_Dashboard/src/pages/admin/BlogManagement.tsx` - Admin blog management
- `src/index.css` - CSS variables and dark mode support
- `tailwind.config.ts` - Tailwind color configuration
- `src/styles/critical.css` - Critical CSS with consistent colors

## Future Considerations

- Consider adding more semantic color variations (success, warning, info)
- Implement color scheme switching for user preferences
- Add color accessibility testing in CI/CD pipeline
- Create design system documentation with Figma integration
