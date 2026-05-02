'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { Home, Search, Plus, MessageSquare, User } from 'lucide-react';

interface NavItemDef {
  key: string;
  icon: React.ReactNode;
  href: string;
}

export default function BottomNav() {
  const t = useTranslations();
  const pathname = usePathname();

  const navItems: NavItemDef[] = [
    { key: 'home', icon: <Home className="w-[22px] h-[22px]" strokeWidth={1.5} />, href: '/' },
    { key: 'adopt', icon: <Search className="w-[22px] h-[22px]" strokeWidth={1.5} />, href: '/adopt' },
    { key: 'share', icon: <Plus className="w-[22px] h-[22px]" strokeWidth={1.5} />, href: '/share' },
    { key: 'messages', icon: <MessageSquare className="w-[22px] h-[22px]" strokeWidth={1.5} />, href: '/messages' },
    { key: 'mySpace', icon: <User className="w-[22px] h-[22px]" strokeWidth={1.5} />, href: '/my-space' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around py-2 pb-[max(8px,env(safe-area-inset-bottom))] bg-surface/90 backdrop-blur-md border-t border-border z-40 max-w-[480px] mx-auto left-1/2 -translate-x-1/2">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.key === 'home' && (pathname === '/' || pathname === '/zh-CN' || pathname === '/en'));
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 min-w-[48px] transition-colors ${
              isActive ? 'text-primary' : 'text-muted'
            }`}
          >
            {isActive ? item.icon : <div className="opacity-70">{item.icon}</div>}
            <span className="text-overline font-medium">
              {t(`nav${item.key.charAt(0).toUpperCase()}${item.key.slice(1)}`)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
