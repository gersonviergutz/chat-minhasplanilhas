import { useState, useEffect } from 'react';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatInterface } from '@/components/ChatInterface';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t, language } = useLanguage();
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>('1');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize conversations with current language
  useEffect(() => {
    setConversations([
      {
        id: '1',
        title: t('firstConversation'),
        lastMessage: t('greeting'),
        timestamp: new Date(),
        messages: [
          {
            id: '1',
            text: t('greeting'),
            isUser: false,
            timestamp: new Date(),
          }
        ]
      }
    ]);
  }, [language, t]);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleSendMessage = (message: string, aiResponse?: Message) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    // Add user message immediately
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

    // If we only have message (first call), start loading
    if (!aiResponse) {
      setIsLoading(true);
      return;
    }

    // If AI response is provided (second call), add it and stop loading
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
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: t('newConversation'),
      lastMessage: t('conversationStarted'),
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
