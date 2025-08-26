# Fitflix Blog Typography Guide

## Overview

This guide explains how to implement Medium-like typography for your blog Markdown content using Tailwind CSS with the `@tailwindcss/typography` plugin and custom CSS enhancements.

## Features

✅ **Medium-like appearance** with clean, readable typography  
✅ **Responsive design** that works on all devices  
✅ **Dark mode support** with automatic theme detection  
✅ **Enhanced spacing** between elements for better readability  
✅ **Beautiful code blocks** with syntax highlighting support  
✅ **Custom styling** for images, tables, blockquotes, and more  
✅ **Consistent color scheme** using your blog color tokens  

## Installation

### 1. Install the Typography Plugin

The `@tailwindcss/typography` plugin is already installed in your project:

```bash
npm install @tailwindcss/typography
```

### 2. Configure Tailwind

The plugin is already configured in your `tailwind.config.ts`:

```ts
plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
```

### 3. Import Custom Styles

The custom typography styles are automatically imported in your `src/index.css`:

```css
@import './styles/blog-typography.css';
```

## Usage

### Basic Implementation

Wrap your `ReactMarkdown` component with the enhanced prose classes:

```tsx
<div className="prose prose-lg prose-slate mx-auto max-w-none prose-enhanced
  prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
  prose-h1:text-4xl prose-h1:mb-8 prose-h1:leading-tight
  prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:leading-tight
  prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:leading-tight
  prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:leading-tight
  prose-h5:text-lg prose-h5:mb-2 prose-h5:mt-4 prose-h5:leading-tight
  prose-h6:text-base prose-h6:mb-2 prose-h6:mt-4 prose-h6:leading-tight
  prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
  prose-strong:text-slate-900 prose-strong:font-semibold
  prose-em:text-slate-800 prose-em:italic
  prose-a:text-orange-500 prose-a:no-underline prose-a:font-medium hover:prose-a:text-orange-600 hover:prose-a:underline
  prose-ul:text-slate-700 prose-ul:leading-relaxed prose-ul:mb-6
  prose-ol:text-slate-700 prose-ol:leading-relaxed prose-ol:mb-6
  prose-li:text-slate-700 prose-li:leading-relaxed prose-li:mb-2
  prose-blockquote:text-slate-600 prose-blockquote:border-l-4 prose-blockquote:border-orange-200 prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-8 prose-blockquote:bg-slate-50 prose-blockquote:rounded-r-lg
  prose-code:text-slate-800 prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
  prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:my-8 prose-pre:shadow-lg
  prose-pre:prose-code:bg-transparent prose-pre:prose-code:text-inherit prose-pre:prose-code:p-0 prose-pre:prose-code:rounded-none
  prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto prose-img:my-8 prose-img:max-w-full prose-img:h-auto
  prose-hr:border-slate-200 prose-hr:my-12
  prose-table:border-collapse prose-table:w-full prose-table:my-8
  prose-th:border prose-th:border-slate-300 prose-th:bg-slate-50 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-slate-900
  prose-td:border prose-td:border-slate-300 prose-td:px-4 prose-td:py-3 prose-td:text-slate-700
  [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
  [&>p:empty]:hidden
  [&>h1+h2]:mt-4 [&>h1+h3]:mt-4 [&>h1+h4]:mt-4 [&>h1+h5]:mt-4 [&>h1+h6]:mt-4
  [&>h2+h3]:mt-4 [&>h2+h4]:mt-4 [&>h2+h5]:mt-4 [&>h2+h6]:mt-4
  [&>h3+h4]:mt-4 [&>h3+h5]:mt-4 [&>h3+h6]:mt-4
  [&>h4+h5]:mt-4 [&>h4+h6]:mt-4
  [&>h5+h6]:mt-4
  [&>p+p]:mt-6
  [&>ul+ul]:mt-4 [&>ol+ol]:mt-4
  [&>ul+p]:mt-6 [&>ol+p]:mt-6
  [&>p+ul]:mt-6 [&>p+ol]:mt-6
  [&>blockquote+p]:mt-6 [&>p+blockquote]:mt-6
  [&>h1+p]:mt-6 [&>h2+p]:mt-6 [&>h3+p]:mt-6 [&>h4+p]:mt-6 [&>h5+p]:mt-6 [&>h6+p]:mt-6
  [&>p+h1]:mt-12 [&>p+h2]:mt-10 [&>p+h3]:mt-8 [&>p+h4]:mt-6 [&>p+h5]:mt-6 [&>p+h6]:mt-6
  [&>ul+h1]:mt-12 [&>ul+h2]:mt-10 [&>ul+h3]:mt-8 [&>ul+h4]:mt-6 [&>ul+h5]:mt-6 [&>ul+h6]:mt-6
  [&>ol+h1]:mt-12 [&>ol+h2]:mt-10 [&>ol+h3]:mt-8 [&>ol+h4]:mt-6 [&>ol+h5]:mt-6 [&>ol+h6]:mt-6
  [&>blockquote+h1]:mt-12 [&>blockquote+h2]:mt-10 [&>blockquote+h3]:mt-8 [&>blockquote+h4]:mt-6 [&>blockquote+h5]:mt-6 [&>blockquote+h6]:mt-6
  [&>h1+ul]:mt-6 [&>h2+ul]:mt-6 [&>h3+ul]:mt-6 [&>h4+ul]:mt-6 [&>h5+ul]:mt-6 [&>h6+ul]:mt-6
  [&>h1+ol]:mt-6 [&>h2+ol]:mt-6 [&>h3+ol]:mt-6 [&>h4+ol]:mt-6 [&>h5+ol]:mt-6 [&>h6+ol]:mt-6
  [&>h1+blockquote]:mt-6 [&>h2+blockquote]:mt-6 [&>h3+blockquote]:mt-6 [&>h4+blockquote]:mt-6 [&>h5+blockquote]:mt-6 [&>h6+blockquote]:mt-6">
  <ReactMarkdown>{blog.content}</ReactMarkdown>
</div>
```

### Simplified Version

For a cleaner approach, you can use the `prose-enhanced` class with basic prose:

```tsx
<div className="prose prose-lg prose-slate mx-auto prose-enhanced">
  <ReactMarkdown>{blog.content}</ReactMarkdown>
</div>
```

## Styling Breakdown

### Typography Classes

| Class | Purpose | Effect |
|-------|---------|---------|
| `prose` | Base typography styles | Provides fundamental text styling |
| `prose-lg` | Large text size | Increases font sizes for better readability |
| `prose-slate` | Color scheme | Uses slate color palette |
| `prose-enhanced` | Custom enhancements | Applies Medium-like styling |

### Element-Specific Styling

#### Headings
```tsx
prose-h1:text-4xl prose-h1:mb-8 prose-h1:leading-tight
prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:leading-tight
prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:leading-tight
```

#### Paragraphs
```tsx
prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
```

#### Links
```tsx
prose-a:text-orange-500 prose-a:no-underline prose-a:font-medium hover:prose-a:text-orange-600 hover:prose-a:underline
```

#### Code Blocks
```tsx
prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:my-8 prose-pre:shadow-lg
```

#### Blockquotes
```tsx
prose-blockquote:text-slate-600 prose-blockquote:border-l-4 prose-blockquote:border-orange-200 prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-8 prose-blockquote:bg-slate-50 prose-blockquote:rounded-r-lg
```

## Custom CSS Features

### Enhanced Blockquotes
- Left border with orange accent
- Subtle background gradient
- Large quotation mark decoration
- Rounded corners

### Code Blocks
- Dark theme with gradient top border
- Rounded corners and shadows
- Proper overflow handling
- Syntax highlighting ready

### Images
- Rounded corners
- Subtle shadows
- Hover effects with lift animation
- Responsive sizing

### Tables
- Clean borders and spacing
- Alternating row colors
- Hover effects
- Responsive design

### Lists
- Custom bullet colors (orange for unordered, slate for ordered)
- Proper spacing between items
- Enhanced typography

## Responsive Design

The typography automatically adapts to different screen sizes:

- **Desktop**: Full typography with optimal spacing
- **Tablet**: Adjusted font sizes and margins
- **Mobile**: Simplified layout with left-aligned text

## Dark Mode Support

Automatic dark mode detection with `prefers-color-scheme: dark`:

- Inverted color scheme
- Adjusted backgrounds and borders
- Maintained readability and contrast

## Markdown Examples

### Headings
```markdown
# Main Title
## Section Title
### Subsection Title
```

### Text Formatting
```markdown
**Bold text** and *italic text*
Regular paragraph with [link text](url)
```

### Lists
```markdown
- Unordered list item
- Another item

1. Ordered list item
2. Second item
```

### Blockquotes
```markdown
> This is a blockquote with enhanced styling
> It will have a beautiful left border and background
```

### Code
```markdown
`inline code` for small snippets

```javascript
// Code block with syntax highlighting
const example = "Hello World";
console.log(example);
```
```

### Tables
```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Images
```markdown
![Alt text](image-url.jpg)
```

## Customization

### Colors
Modify the color scheme in `src/styles/blog-typography.css`:

```css
.prose-enhanced h1 {
  color: #your-color;
}

.prose-enhanced a {
  color: #your-accent-color;
}
```

### Spacing
Adjust margins and padding in the CSS file:

```css
.prose-enhanced p {
  margin-bottom: 2rem; /* Increase paragraph spacing */
}

.prose-enhanced h2 {
  margin-top: 3rem; /* Increase heading spacing */
}
```

### Typography
Modify font sizes and weights:

```css
.prose-enhanced h1 {
  font-size: 3rem; /* Larger main title */
  font-weight: 900; /* Bolder weight */
}
```

## Performance

- **CSS-only styling** for optimal performance
- **No JavaScript dependencies** for typography
- **Efficient selectors** using modern CSS
- **Minimal bundle impact** with Tailwind

## Browser Support

- **Modern browsers**: Full support
- **CSS Grid and Flexbox**: Required
- **CSS Custom Properties**: Required
- **Fallbacks**: Graceful degradation for older browsers

## Troubleshooting

### Typography Not Working
1. Ensure `@tailwindcss/typography` is installed
2. Check that the plugin is added to `tailwind.config.ts`
3. Verify the CSS import in `src/index.css`

### Styling Conflicts
1. Check for conflicting CSS rules
2. Use more specific selectors if needed
3. Ensure proper CSS cascade order

### Responsive Issues
1. Test on different screen sizes
2. Check media query breakpoints
3. Verify viewport meta tag

## Examples

See `src/components/BlogMarkdownDemo.tsx` for a complete example of the enhanced typography in action.

## Support

For questions or issues:
1. Check this documentation
2. Review the CSS files
3. Test with the demo component
4. Check browser developer tools for styling conflicts
