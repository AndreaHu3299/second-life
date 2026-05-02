'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getTopItems, getAvailableItems, getLocalised, formatDistance } from '@/lib/types';
import type { Item, ItemCategory, AppLocale } from '@/lib/types';
import ItemCard from '@/components/ItemCard';
import { ITEMS, CATEGORIES } from '@/lib/seed-data';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Sparkles, Tag, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale() as AppLocale;
  const [counterDisplay, setCounterDisplay] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | null>(null);

  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('counter');
    let target = 470;
    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) {
        target = data.value;
      } else {
        target = Math.floor(Math.random() * 51) + 2758;
        localStorage.setItem('counter', JSON.stringify({ date: today, value: target }));
      }
    } else {
      target = Math.floor(Math.random() * 51) + 2758;
      localStorage.setItem('counter', JSON.stringify({ date: today, value: target }));
    }

    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCounterDisplay(target);
        clearInterval(timer);
      } else {
        setCounterDisplay(current);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const topItems = getTopItems(ITEMS, 5);
  const displayed = selectedCategory
    ? getAvailableItems(ITEMS).filter((i) => i.category === selectedCategory)
    : getAvailableItems(ITEMS);

  const handleCategorySelect = useCallback((cat: ItemCategory | null) => {
    setSelectedCategory(cat);
  }, []);

  return (
    <div className="py-6 md:py-10">
      {/* Hero Section */}
      {!selectedCategory && (
        <section className="mb-10 md:mb-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            <div className="max-w-lg">
              <p className="text-xs font-medium text-muted uppercase tracking-widest mb-3">
                {locale === 'zh-CN' ? '宝贝回新家' : 'Second-Life Treasures'}
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                {t('tagline')}
              </h1>
              <p className="text-base text-muted leading-relaxed mb-6 max-w-md">
                {t('description')}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/adopt"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-white text-sm font-medium transition-colors hover:bg-foreground/90"
                >
                  {t('ctaAdopt')}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
                <Link
                  href="/share"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-surface text-sm font-medium text-foreground transition-colors hover:bg-bg"
                >
                  {t('ctaShare')}
                </Link>
              </div>
            </div>
            {/* Impact Counter */}
            <div className="flex-shrink-0 rounded-xl bg-secondary-light px-6 py-5 md:text-center min-w-[180px]">
              <div className="text-4xl font-semibold text-secondary tabular-nums">
                {counterDisplay}
              </div>
              <p className="text-sm text-muted mt-1 leading-snug">
                {t('counterLabel')}{' '}
                <span className="font-medium text-secondary">{counterDisplay}</span>{' '}
                {t('counterSuffix')}
              </p>
            </div>
          </div>
        </section>
      )}

      {selectedCategory ? (
        /* Category View */
        <section>
          <div className="flex items-center justify-between mb-6">
            <button
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              onClick={() => handleCategorySelect(null)}
            >
              <ArrowRight className="w-4 h-4 rotate-180" strokeWidth={1.5} />
              {locale === 'zh-CN' ? '返回全部' : 'Back to all'}
            </button>
            <span className="text-sm text-muted">
              {displayed.length} {locale === 'zh-CN' ? '个宝贝' : 'items'}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {displayed.map((item, idx) => (
              <ItemCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* Categories */}
          <section className="mb-10 md:mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted" strokeWidth={1.5} />
                <h2 className="heading-sm">
                  {locale === 'zh-CN' ? '选个类别' : 'Browse by Category'}
                </h2>
              </div>
              {selectedCategory && (
                <button
                  className="text-sm text-primary hover:underline"
                  onClick={() => handleCategorySelect(null)}
                >
                  {locale === 'zh-CN' ? '查看全部' : 'View all'}
                </button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  className="flex-shrink-0 px-4 py-2 rounded-lg border border-border bg-surface text-sm font-medium text-foreground hover:bg-bg hover:border-border-hover transition-colors"
                  onClick={() => handleCategorySelect(cat.key)}
                >
                  {t(`categories.${cat.key}`)}
                </button>
              ))}
            </div>
          </section>

          {/* Most Viewed / Featured */}
          {topItems.length > 0 && (
            <section className="mb-10 md:mb-12">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-muted" strokeWidth={1.5} />
                  <h2 className="heading-sm">
                    {locale === 'zh-CN' ? '大家都在看' : 'Most Viewed'}
                  </h2>
                </div>
                <Link
                  href="/adopt"
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground transition-colors"
                >
                  {locale === 'zh-CN' ? '查看全部' : 'View all'}
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              </div>
              {/* Desktop: horizontal grid row, Mobile: horizontal scroll */}
              <div className="hidden md:grid md:grid-cols-5 gap-4">
                {topItems.map((item) => (
                  <ItemCard key={item.id} item={item} aspect="tall" />
                ))}
              </div>
              <div className="flex gap-4 overflow-x-auto md:hidden pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {topItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/item/${item.id}`}
                    className="flex-shrink-0 w-[200px] bg-card rounded-lg overflow-hidden border border-border group transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-bg">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
                        style={{ backgroundImage: `url(${item.photo})` }}
                      />
                    </div>
                    <div className="px-3.5 py-3">
                      <h3 className="heading-xs mb-1 truncate">
                        {getLocalised(item.name, locale)}
                      </h3>
                      <p className="text-xs text-muted line-clamp-2">
                        {getLocalised(item.story, locale)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Recent Items Grid */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="heading-sm">
                {locale === 'zh-CN' ? '所有宝贝' : 'All Treasures'}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {displayed.slice(0, selectedCategory ? undefined : 12).map((item, idx) => (
                <ItemCard key={item.id} item={item} index={idx} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/adopt"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-border bg-surface text-sm font-medium text-foreground hover:bg-bg transition-colors"
              >
                {locale === 'zh-CN' ? '查看更多' : 'Browse all'}
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
