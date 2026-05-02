'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Sprout, Globe, Home, Search, Plus, MessageSquare, User } from 'lucide-react';

const navLinks = [
  { key: 'home', icon: Home, label: 'navHome', href: '/' },
  { key: 'adopt', icon: Search, label: 'navAdopt', href: '/adopt' },
  { key: 'share', icon: Plus, label: 'navShare', href: '/share' },
  { key: 'messages', icon: MessageSquare, label: 'navMessages', href: '/messages' },
  { key: 'mySpace', icon: User, label: 'navMySpace', href: '/my-space' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === 'zh-CN' ? 'en' : 'zh-CN';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between px-8 py-3.5 bg-surface border-b border-border sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-primary" strokeWidth={2} />
          <span className="heading-sm">
            {t('appName')}
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.key === 'home' && (pathname === '/' || pathname === '/zh-CN' || pathname === '/en'));
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary bg-primary-light'
                    : 'text-muted hover:text-foreground hover:bg-bg'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={isActive ? 2 : 1.5} />
                {t(link.label)}
              </Link>
            );
          })}
        </nav>
        <button
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-muted hover:bg-bg hover:text-foreground transition-colors"
          onClick={() => router.replace(pathname, { locale: nextLocale })}
        >
          <Globe className="w-3.5 h-3.5" strokeWidth={2} />
          {locale === 'zh-CN' ? 'EN' : '中文'}
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-0 md:py-0">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around py-2 pb-[max(8px,env(safe-area-inset-bottom))] bg-surface/90 backdrop-blur-md border-t border-border z-40 md:hidden">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.key === 'home' && (pathname === '/' || pathname === '/zh-CN' || pathname === '/en'));
          return (
            <Link
              key={link.key}
              href={link.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 min-w-[48px] transition-colors ${
                isActive ? 'text-primary' : 'text-muted/60'
              }`}
            >
              <Icon className="w-[20px] h-[20px]" strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-overline font-medium">{t(link.label)}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
