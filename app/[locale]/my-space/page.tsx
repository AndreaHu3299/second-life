'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/hooks/useAuth';
import EmptyState from '@/components/EmptyState';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { ChevronRight, LogOut, Heart, MessageSquare, Settings, Globe, ListPlus } from 'lucide-react';

export default function MySpacePage() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === 'zh-CN' ? 'en' : 'zh-CN';
  const [showLogin, setShowLogin] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isLoggedIn, user, wishlist, login, register, logout } = useAuth();

  if (!isLoggedIn) {
    return (
      <>
        <div className="py-6 md:py-10 text-center">
          <EmptyState
            title={locale === 'zh-CN' ? '欢迎来到我的空间' : 'Welcome to My Space'}
            description={t('guestPrompt')}
          />
          <div className="flex gap-2 justify-center">
            <button
              className="px-5 py-2.5 rounded-lg bg-foreground text-white text-sm font-medium transition-colors hover:bg-foreground/90"
              onClick={() => {
                setAuthMode('login');
                setShowLogin(true);
              }}
            >
              {t('guestLogin')}
            </button>
            <button
              className="px-5 py-2.5 rounded-lg border border-border bg-surface text-sm font-medium text-foreground transition-colors hover:bg-bg"
              onClick={() => {
                setAuthMode('register');
                setShowLogin(true);
              }}
            >
              {t('guestRegister')}
            </button>
          </div>
        </div>
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onLogin={(creds) => {
            login(creds);
            setShowLogin(false);
          }}
          onRegister={(details) => {
            register(details);
            setShowLogin(false);
          }}
          initialMode={authMode}
        />
      </>
    );
  }

  const menuItems = [
    { icon: Heart, label: t('myWishlist'), badge: wishlist.length, href: '/adopt' },
    { icon: ListPlus, label: t('meetupRequests'), href: '/messages' },
    { icon: Settings, label: t('editProfile'), href: '/share' },
  ];

  return (
    <div className="py-6 md:py-10">
      <div className="max-w-2xl mx-auto">
        {/* Profile */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-xl font-semibold text-primary shrink-0">
            {user?.nickname?.charAt(0) || (locale === 'zh-CN' ? '邻' : 'N')}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="heading-md">{user?.nickname}</h2>
            <p className="text-sm text-muted mt-0.5">
              {user?.bio || (locale === 'zh-CN' ? '爱宝贝的邻居' : 'A treasure-loving neighbor')}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-border rounded-lg overflow-hidden mb-8">
          <div className="bg-card text-center py-5">
            <div className="text-xl font-semibold text-foreground">0</div>
            <div className="text-caption text-muted mt-1 font-medium">{t('myStats.posted')}</div>
          </div>
          <div className="bg-card text-center py-5">
            <div className="text-xl font-semibold text-foreground">0</div>
            <div className="text-caption text-muted mt-1 font-medium">{t('myStats.adoptedOut')}</div>
          </div>
          <div className="bg-card text-center py-5">
            <div className="text-xl font-semibold text-foreground">0</div>
            <div className="text-caption text-muted mt-1 font-medium">{t('myStats.adoptedIn')}</div>
          </div>
        </div>

        {/* Menu */}
        <div className="rounded-lg border border-border overflow-hidden">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={i}
                href={item.href}
                className="flex items-center justify-between px-4 py-3.5 border-b border-border last:border-b-0 text-sm text-foreground hover:bg-bg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-muted" strokeWidth={1.5} />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-medium">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-muted-light" strokeWidth={1.5} />
                </div>
              </Link>
            );
          })}
          <button
            className="w-full flex items-center justify-between px-4 py-3.5 border-b border-border text-sm font-medium text-foreground hover:bg-bg transition-colors"
            onClick={() => router.replace(pathname, { locale: nextLocale })}
          >
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-muted" strokeWidth={1.5} />
              <span>{t('language')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted">{locale === 'zh-CN' ? 'EN' : '中文'}</span>
              <ChevronRight className="w-4 h-4 text-muted-light" strokeWidth={1.5} />
            </div>
          </button>
          <button
            className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
            onClick={logout}
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              <span>{t('logout')}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-light" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
