import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string, aiResponse?: Message) => void;
  isLoading: boolean;
}

export const ChatInterface = ({ messages, onSendMessage, isLoading }: ChatInterfaceProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    // First add user message to UI
    onSendMessage(message);
    
    try {
      // Call the webhook
      const response = await fetch('https://webhook.minhasplanilhas.com.br/webhook/c473fbb7-2b77-41d4-933f-1faffd9c7d3f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get response content
      let responseContent = 'Mensagem processada com sucesso.';
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const text = await response.text();
        if (text.trim()) {
          const data = JSON.parse(text);
          // Try to extract meaningful content from webhook response
          responseContent = data.message || data.response || data.content || JSON.stringify(data);
        }
      } else {
        // Handle text response
        const text = await response.text();
        if (text.trim()) {
          responseContent = text;
        }
      }
      
      // Add AI response with webhook content
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: responseContent,
        isUser: false,
        timestamp: new Date(),
      };
      
      // Add AI response with webhook content using the callback
      onSendMessage(message, aiResponse);
      
      toast({
        title: "Mensagem enviada",
        description: "Resposta recebida do webhook!",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error response
      const errorResponse = {
        id: (Date.now() + 1).toString(),
        text: `Erro ao processar mensagem: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        isUser: false,
        timestamp: new Date(),
      };
      
      onSendMessage(message, errorResponse);
      
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-chat-background">
      {/* Header */}
      <div className="border-b border-chat-border bg-chat-surface p-4">
        <h2 className="text-lg font-semibold text-foreground">Chat GPT Clone</h2>
        <p className="text-sm text-muted-foreground">Assistente de IA baseado em webhook</p>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="min-h-full">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Bem-vindo ao Chat GPT Clone</h3>
                <p className="text-muted-foreground">
                  Comece uma conversa digitando uma mensagem abaixo. Suas mensagens serão enviadas para o webhook configurado.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              {isLoading && (
                <ChatMessage
                  message=""
                  isUser={false}
                  timestamp={new Date()}
                  isLoading
                />
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};