'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Sprout, Globe } from 'lucide-react';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === 'zh-CN' ? 'en' : 'zh-CN';

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 bg-surface/80 backdrop-blur-md border-b border-border">
      <Link href="/" className="flex items-center gap-2 group">
        <Sprout className="w-5 h-5 text-primary" strokeWidth={2} />
        <span className="heading-sm">
          {t('appName')}
        </span>
      </Link>
      <button
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted hover:bg-bg-warm hover:text-foreground transition-colors"
        onClick={() => router.replace(pathname, { locale: nextLocale })}
      >
        <Globe className="w-3.5 h-3.5" strokeWidth={2} />
        {locale === 'zh-CN' ? 'EN' : '中文'}
      </button>
    </header>
  );
}
