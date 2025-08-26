import React from 'react';

// Demo component to showcase the enhanced Markdown styling
const BlogMarkdownDemo = () => {
  const sampleMarkdown = `# Welcome to Fitflix Fitness Blog

This is a sample blog post to demonstrate the enhanced typography styling that makes your content look like Medium articles.

## Getting Started with Fitness

Starting your fitness journey can be overwhelming, but with the right approach, it becomes an exciting adventure. Here are some key points to consider:

### 1. Set Clear Goals
- **Specific**: Define exactly what you want to achieve
- **Measurable**: Track your progress with concrete metrics
- **Achievable**: Set realistic expectations
- **Time-bound**: Give yourself deadlines

### 2. Choose the Right Exercises

Here's a simple workout routine to get started:

\`\`\`javascript
const workoutRoutine = {
  warmup: "5 minutes cardio",
  strength: ["Squats", "Push-ups", "Planks"],
  cooldown: "Stretching exercises"
};
\`\`\`

> **Pro Tip**: Always start with a proper warm-up to prevent injuries and improve performance. Remember, consistency is more important than intensity when you're beginning.

## Nutrition Basics

Proper nutrition is the foundation of any fitness program. Here's what you need to know:

| Nutrient | Purpose | Good Sources |
|----------|---------|--------------|
| Protein | Muscle building | Chicken, fish, eggs |
| Carbs | Energy | Rice, potatoes, fruits |
| Fats | Hormone production | Nuts, avocados, olive oil |

### Meal Planning

Planning your meals ahead of time can make a huge difference. Here are some tips:

1. **Prep on Sundays**: Cook multiple meals at once
2. **Use containers**: Portion control is easier
3. **Keep it simple**: Don't overcomplicate your diet

---

## Advanced Techniques

Once you've mastered the basics, you can move on to more advanced techniques like:

- Progressive overload
- Supersets
- Drop sets
- Circuit training

Remember, **progress takes time**, but every small step counts toward your larger goals.

For more information, visit our [fitness guides](/guides) or [contact our trainers](/contact).`;

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
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
            <div dangerouslySetInnerHTML={{ __html: sampleMarkdown }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogMarkdownDemo;
