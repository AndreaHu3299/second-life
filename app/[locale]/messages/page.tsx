'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { ChevronLeft, Send, MapPin, CheckCircle2 } from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  itemId: number;
  itemName: { zh: string; en: string };
  itemPhoto: string;
  ownerName: string;
  ownerAvatar: string;
  messages: ChatMessage[];
  unread: number;
}

const FAKE_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    itemId: 1,
    itemName: { zh: '小暖', en: 'A-Nuan' },
    itemPhoto: 'https://images.unsplash.com/photo-1645454720244-29f8e894f662?q=80&w=1374&auto=format&fit=crop',
    ownerName: '小暖主人',
    ownerAvatar: '暖',
    messages: [
      { id: 'm1', sender: 'them', text: '你好！看到小暖的档案，很喜欢。想问一下还在吗？', time: '10:30' },
      { id: 'm2', sender: 'me', text: '你好！还在的，小暖一直在等新主人', time: '10:32' },
      { id: 'm3', sender: 'them', text: '太好了，我在朝阳区，离你很近。我可以这周末来看吗？', time: '10:35' },
      { id: 'm4', sender: 'me', text: '周末可以的！周六下午怎么样？可以在附近的咖啡馆见面', time: '10:38' },
      { id: 'm5', sender: 'them', text: '好的！周六下午2点，我到时候带点小礼物给小暖', time: '10:40' },
      { id: 'm6', sender: 'me', text: '哈哈太好了，小暖一定会很高兴见到你的', time: '10:42' },
      { id: 'm7', sender: 'them', text: '好的，那我们就约好了！不见不散 😊', time: '10:43' },
    ],
    unread: 1,
  },
  {
    id: 'conv-2',
    itemId: 3,
    itemName: { zh: '铁铁', en: 'Tie-Tie' },
    itemPhoto: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    ownerName: '摄影爱好者',
    ownerAvatar: '摄',
    messages: [
      { id: 'm1', sender: 'me', text: '你好，铁铁还在吗？胶片相机的色调太吸引人了', time: '昨天 15:20' },
      { id: 'm2', sender: 'them', text: '在的在的！铁铁状态很好，胶卷还能拍大概20张', time: '昨天 15:45' },
      { id: 'm3', sender: 'me', text: '价格可以商量吗？', time: '昨天 16:00' },
      { id: 'm4', sender: 'them', text: '188可以小刀的，如果你真的喜欢的话', time: '昨天 16:10' },
      { id: 'm5', sender: 'me', text: '那150怎么样？我可以自取', time: '昨天 16:15' },
      { id: 'm6', sender: 'them', text: '成交！你在哪个区？我在西城区', time: '昨天 16:20' },
    ],
    unread: 0,
  },
  {
    id: 'conv-3',
    itemId: 12,
    itemName: { zh: '小熊', en: 'Little Bear' },
    itemPhoto: 'https://images.unsplash.com/photo-1652501595862-1d06fe543544?q=80&w=3270&auto=format&fit=crop',
    ownerName: '小米',
    ownerAvatar: '米',
    messages: [
      { id: 'm1', sender: 'them', text: '小熊还没被领走吗？好可爱啊', time: '3天前' },
      { id: 'm2', sender: 'me', text: '还在的！免费领养，只需要爱它就好', time: '3天前' },
      { id: 'm3', sender: 'them', text: '我家小朋友一定会很开心！', time: '3天前' },
    ],
    unread: 0,
  },
];

function formatTime(date: Date): string {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

function ConversationList({
  conversations,
  selectedId,
  onSelect,
  locale,
}: {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  locale: string;
}) {
  const t = useTranslations();
  return (
    <div className="flex flex-col">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="heading-sm">
          {locale === 'zh-CN' ? '消息' : 'Messages'}
        </h2>
      </div>
      {conversations.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <p className="text-sm text-muted">
            {locale === 'zh-CN' ? '还没有消息' : 'No messages yet'}
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => {
            const lastMsg = conv.messages[conv.messages.length - 1];
            const isSelected = selectedId === conv.id;
            return (
              <button
                key={conv.id}
                className={`w-full flex items-start gap-3 px-4 py-3.5 border-b border-border text-left transition-colors ${
                  isSelected ? 'bg-primary-light/40' : 'hover:bg-bg'
                }`}
                onClick={() => onSelect(conv.id)}
              >
                <div className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center text-sm font-semibold text-secondary shrink-0">
                  {conv.ownerAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-sm font-medium text-foreground truncate">{conv.ownerName}</span>
                    <span className="text-caption text-muted shrink-0">{lastMsg.time}</span>
                  </div>
                  <p className="text-xs text-muted truncate mb-0.5">{lastMsg.text}</p>
                  <p className="text-caption text-muted truncate">
                    {locale === 'zh-CN' ? '关于: ' : 'Re: '}
                    {locale === 'zh-CN' ? conv.itemName.zh : conv.itemName.en}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">
                    {conv.unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ChatView({
  conversation,
  locale,
  onBack,
}: {
  conversation: Conversation;
  locale: string;
  onBack: () => void;
}) {
  const t = useTranslations();
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-surface shrink-0">
        <button
          className="md:hidden w-8 h-8 rounded-full flex items-center justify-center hover:bg-bg transition-colors text-muted"
          onClick={onBack}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <div className="w-9 h-9 rounded-full bg-secondary-light flex items-center justify-center text-sm font-semibold text-secondary shrink-0">
          {conversation.ownerAvatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{conversation.ownerName}</p>
          <p className="text-caption text-muted">
            {locale === 'zh-CN' ? '关于: ' : 'Re: '}
            {locale === 'zh-CN' ? conversation.itemName.zh : conversation.itemName.en}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-lg bg-cover bg-center bg-bg shrink-0"
          style={{ backgroundImage: `url(${conversation.itemPhoto})` }}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {conversation.messages.map((msg) => {
          const isMe = msg.sender === 'me';
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm ${
                  isMe
                    ? 'bg-foreground text-white rounded-br-md'
                    : 'bg-bg text-foreground rounded-bl-md'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-caption mt-0.5 ${isMe ? 'text-white/60' : 'text-muted'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-surface shrink-0">
        <div className="flex items-center gap-2">
          <input
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-border bg-bg text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary"
            placeholder={locale === 'zh-CN' ? '说点什么...' : 'Say something...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="w-9 h-9 rounded-lg bg-foreground flex items-center justify-center text-white transition-colors hover:bg-foreground/90 shrink-0"
            onClick={() => setInput('')}
            disabled={!input.trim()}
          >
            <Send className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [conversations] = useState<Conversation[]>(FAKE_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string | null>(
    FAKE_CONVERSATIONS.length > 0 ? FAKE_CONVERSATIONS[0].id : null,
  );
  const [showChat, setShowChat] = useState(false);

  const selectedConv = conversations.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="py-6 md:py-10">
      <div className="h-[calc(100vh-8rem)] max-w-2xl mx-auto rounded-xl border border-border bg-surface overflow-hidden flex">
        {/* Conversation List */}
        <div
          className={`flex flex-col border-r border-border bg-surface transition-all ${
            showChat ? 'hidden md:flex' : 'flex flex-1'
          } md:w-64 md:shrink-0 w-full`}
        >
          <ConversationList
            conversations={conversations}
            selectedId={selectedId}
            onSelect={(id) => {
              setSelectedId(id);
              setShowChat(true);
            }}
            locale={locale}
          />
        </div>

        {/* Chat View */}
        {selectedConv && (
          <div
            className={`flex flex-col flex-1 ${
              showChat ? 'flex' : 'hidden'
            } ${!showChat ? 'md:flex' : ''}`}
          >
            {showChat ? (
              <ChatView
                conversation={selectedConv}
                locale={locale}
                onBack={() => setShowChat(false)}
              />
            ) : null}
          </div>
        )}

        {/* Empty chat state */}
        {!selectedConv && (
          <div className="hidden md:flex flex-col flex-1 items-center justify-center p-6">
            <p className="text-sm text-muted">
              {locale === 'zh-CN' ? '选择一个对话开始聊天' : 'Select a conversation to start chatting'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}