import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-chat-border bg-chat-surface p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('typeMessage')}
            className="min-h-[50px] max-h-32 pr-12 resize-none bg-background border-chat-border focus:ring-primary focus:border-primary transition-smooth"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!message.trim() || isLoading}
            className="absolute right-2 bottom-2 bg-primary hover:bg-primary-hover text-primary-foreground transition-smooth disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          {t('sendHint')}
        </div>
      </form>
    </div>
  );
};