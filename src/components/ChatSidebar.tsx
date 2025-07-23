import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, MessageSquare, MoreHorizontal } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

export const ChatSidebar = ({ 
  conversations, 
  activeConversationId, 
  onSelectConversation, 
  onNewConversation 
}: ChatSidebarProps) => {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Button 
          onClick={onNewConversation}
          className="w-full bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80 transition-smooth"
          variant="ghost"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova conversa
        </Button>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full text-left p-3 rounded-lg transition-smooth group hover:bg-sidebar-accent cursor-pointer ${
                activeConversationId === conversation.id 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-1">
                    <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">
                      {conversation.title}
                    </span>
                  </div>
                  <p className="text-xs opacity-70 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                <button 
                  className="opacity-0 group-hover:opacity-100 ml-2 p-1 hover:bg-sidebar-border rounded transition-smooth"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle conversation options
                  }}
                >
                  <MoreHorizontal className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground opacity-60 text-center">
          Chat GPT Clone
        </div>
      </div>
    </div>
  );
};