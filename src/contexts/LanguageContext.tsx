import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Chat Sidebar
    'newConversation': 'Nova conversa',
    'firstConversation': 'Primeira conversa',
    'newChat': 'Nova conversa',
    'conversationStarted': 'Conversa iniciada',
    
    // Chat Interface
    'typeMessage': 'Digite sua mensagem...',
    'send': 'Enviar',
    'greeting': 'Olá! Como posso ajudar você hoje?',
    'sendHint': 'Pressione Enter para enviar, Shift + Enter para quebrar linha',
    
    // Language Selector
    'language': 'Idioma',
    'portuguese': 'Português',
    'english': 'English',
    'changeLanguage': 'Alterar idioma',
    
    // Common
    'loading': 'Carregando...',
    'notFound': 'Página não encontrada',
    'home': 'Início',
  },
  en: {
    // Chat Sidebar
    'newConversation': 'New conversation',
    'firstConversation': 'First conversation',
    'newChat': 'New chat',
    'conversationStarted': 'Conversation started',
    
    // Chat Interface
    'typeMessage': 'Type your message...',
    'send': 'Send',
    'greeting': 'Hello! How can I help you today?',
    'sendHint': 'Press Enter to send, Shift + Enter for new line',
    
    // Language Selector
    'language': 'Language',
    'portuguese': 'Português',
    'english': 'English',
    'changeLanguage': 'Change language',
    
    // Common
    'loading': 'Loading...',
    'notFound': 'Page not found',
    'home': 'Home',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
