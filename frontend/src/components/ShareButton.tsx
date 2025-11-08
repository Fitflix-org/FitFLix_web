import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonProps {
  title: string;
  url: string;
  text?: string;
}

async function shareContent(data: {
  title: string;
  text: string;
  url: string;
}) {
  // Check if the Web Share API is supported
  if (navigator.share) {
    try {
      await navigator.share(data);
      return { success: true, method: 'native' };
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, method: 'native', error: 'User cancelled' };
      }
      // Fall through to clipboard fallback
    }
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(data.url);
    return { success: true, method: 'clipboard' };
  } catch {
    // Final fallback - create a temporary textarea
    const textArea = document.createElement('textarea');
    textArea.value = data.url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return { success: true, method: 'fallback' };
    } catch (_fallbackError) {
      document.body.removeChild(textArea);
      return { success: false, method: 'fallback', error: 'Failed to copy' };
    }
  }
}

export function ShareButton({ title, url, text }: ShareButtonProps) {
  const [isShared, setIsShared] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async () => {
    setIsLoading(true);
    
    try {
      const result = await shareContent({
        title,
        text: text || `Check out this article: ${title}`,
        url
      });

      if (result.success) {
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleShare}
      disabled={isLoading}
      className="transition-all duration-200"
    >
      {isLoading ? (
        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      ) : isShared ? (
        <Check className="h-4 w-4 mr-2 text-green-600" />
      ) : (
        <Share2 className="h-4 w-4 mr-2" />
      )}
      {isShared ? 'Copied!' : 'Share'}
    </Button>
  );
}
