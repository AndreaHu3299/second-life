'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Heart, Clock, ArrowRight, Banknote } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { formatDistance, getLocalised } from '@/lib/types';
import type { Item, AppLocale } from '@/lib/types';

interface ItemCardProps {
  item: Item;
  index?: number;
  saved?: boolean;
  onSave?: (item: Item) => void;
  aspect?: 'standard' | 'tall';
}

export default function ItemCard({ item, index = 0, saved = false, onSave, aspect = 'standard' }: ItemCardProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations();

  const timeDisplay = (() => {
    const diff = Date.now() - item.timestamp;
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    if (days === 0) return locale === 'zh-CN' ? '今天' : 'Today';
    if (days === 1) return locale === 'zh-CN' ? '昨天' : 'Yesterday';
    if (days < 7)
      return locale === 'zh-CN' ? `${days}天前` : `${days}d ago`;
    const weeks = Math.floor(days / 7);
    return locale === 'zh-CN' ? `${weeks}周前` : `${weeks}w ago`;
  })();

  const statusLabel =
    item.status === 'found'
      ? locale === 'zh-CN'
        ? '已找到新家'
        : 'Adopted'
      : item.status === 'waiting'
        ? locale === 'zh-CN'
          ? '等待领养'
          : 'Available'
        : '';

  return (
    <div
      className="bg-card rounded-lg overflow-hidden border border-border group transition-all duration-200 hover:shadow-md animate-fadeInUp"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <Link href={`/item/${item.id}`}>
        <div className="relative overflow-hidden bg-bg">
          <div
            className="w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
            style={{
              backgroundImage: `url(${item.photo})`,
              aspectRatio: aspect === 'tall' ? '3/4' : '4/3',
            }}
          />
          {statusLabel && (
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-caption font-medium bg-surface/90 backdrop-blur-sm text-foreground">
              {statusLabel}
            </div>
          )}
          {onSave && (
            <button
              className="absolute top-2 left-2 w-8 h-8 rounded-full bg-surface/90 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-surface"
              onClick={(e) => {
                e.preventDefault();
                onSave(item);
              }}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  saved ? 'fill-primary text-primary' : 'text-muted'
                }`}
                strokeWidth={2}
              />
            </button>
          )}
        </div>
      </Link>
      <div className="px-3.5 py-3">
        <Link href={`/item/${item.id}`}>
          <h3 className="heading-xs mb-1 truncate">
            {getLocalised(item.name, locale)}
          </h3>
        </Link>
        <div className="flex items-center justify-between text-caption text-muted font-medium mb-1.5">
          <div className="flex items-center gap-2">
            <span>{formatDistance(item.distance, locale)}</span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-0.5">
              <Clock className="w-3 h-3" strokeWidth={1.5} />
              {timeDisplay}
            </span>
          </div>
          <span className="flex items-center gap-0.5 text-primary font-semibold">
            <Banknote className="w-3 h-3" strokeWidth={1.5} />
            {item.price === 0 ? (locale === 'zh-CN' ? '免费' : 'Free') : `¥${item.price}`}
          </span>
        </div>
        <p className="text-xs text-muted line-clamp-2">
          {getLocalised(item.story, locale)}
        </p>
        {item.status === 'waiting' && (
          <Link
            href={`/item/${item.id}`}
            className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            {t('quickAdopt')}
            <ArrowRight className="w-3 h-3" strokeWidth={2} />
          </Link>
        )}
      </div>
    </div>
  );
}
