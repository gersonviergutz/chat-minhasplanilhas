import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

export const ChatMessage = ({ message, isUser, timestamp, isLoading }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-4 p-6 transition-smooth",
      isUser ? "bg-transparent" : "bg-chat-surface"
    )}>
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isUser 
          ? "bg-user-message text-user-message-foreground" 
          : "bg-assistant-message border border-chat-border"
      )}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4 text-assistant-message-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isUser ? 'Você' : 'Assistente'}
          </span>
          <span className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        
        <div className="prose prose-sm max-w-none">
          {isLoading ? (
            <div className="flex items-center gap-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-muted-foreground ml-2">Digitando...</span>
            </div>
          ) : (
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};