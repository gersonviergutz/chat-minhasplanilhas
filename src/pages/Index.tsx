import { useState } from 'react';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatInterface } from '@/components/ChatInterface';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Primeira conversa',
      lastMessage: 'Olá! Como posso ajudar?',
      timestamp: new Date(),
      messages: [
        {
          id: '1',
          text: 'Olá! Como posso ajudar você hoje?',
          isUser: false,
          timestamp: new Date(),
        }
      ]
    }
  ]);
  
  const [activeConversationId, setActiveConversationId] = useState<string>('1');
  const [isLoading, setIsLoading] = useState(false);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleSendMessage = (message: string) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversationId) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: message,
          timestamp: new Date(),
        };
      }
      return conv;
    }));

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Obrigado pela sua mensagem! Ela foi enviada para o webhook configurado.',
        isUser: false,
        timestamp: new Date(),
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, aiResponse],
            lastMessage: aiResponse.text,
            timestamp: new Date(),
          };
        }
        return conv;
      }));
      setIsLoading(false);
    }, 1500);
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'Nova conversa',
      lastMessage: 'Conversa iniciada',
      timestamp: new Date(),
      messages: [],
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  return (
    <div className="h-screen flex bg-background">
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
      />
      <ChatInterface
        messages={activeConversation?.messages || []}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Index;
