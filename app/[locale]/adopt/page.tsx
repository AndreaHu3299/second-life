'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Search, ChevronDown, X } from 'lucide-react';
import ItemCard from '@/components/ItemCard';
import EmptyState from '@/components/EmptyState';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/hooks/useAuth';
import { ITEMS, CATEGORIES } from '@/lib/seed-data';
import { getAvailableItems, type ItemCategory } from '@/lib/types';

const DISTANCE_OPTIONS = [
  { value: 0, zh: '全部距离', en: 'All distances' },
  { value: 250, zh: '≤250m', en: '≤250m' },
  { value: 500, zh: '≤500m', en: '≤500m' },
  { value: 750, zh: '≤750m', en: '≤750m' },
  { value: 1000, zh: '≤1km', en: '≤1km' },
  { value: 2000, zh: '≤2km', en: '≤2km' },
  { value: 3000, zh: '≤3km', en: '≤3km' },
  { value: 5000, zh: '≤5km', en: '≤5km' },
  { value: 10000, zh: '≤10km', en: '≤10km' },
];

const SORT_OPTIONS = [
  { value: 'newest', zh: '最新发布', en: 'Newest' },
  { value: 'nearest', zh: '离我最近', en: 'Nearest' },
  { value: 'priceLow', zh: '价格从低到高', en: 'Price: Low to High' },
  { value: 'popular', zh: '最多浏览', en: 'Most Viewed' },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]['value'];

export default function AdoptPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ItemCategory | null>(null);
  const [maxDistance, setMaxDistance] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'sort' | 'cat' | 'dist' | null>(null);
  const { login, register, addToWishlist, removeFromWishlist, isSaved } = useAuth();

  const filtered = useMemo(() => {
    let items = getAvailableItems(ITEMS);

    if (category) {
      items = items.filter((i) => i.category === category);
    }

    if (maxDistance > 0) {
      items = items.filter((i) => i.distance <= maxDistance);
    }

    if (maxPrice.trim()) {
      const priceNum = Number(maxPrice);
      if (!isNaN(priceNum)) {
        items = items.filter((i) => i.price <= priceNum);
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) =>
          (item.name.zh + item.name.en).toLowerCase().includes(q) ||
          (item.story.zh + item.story.en).toLowerCase().includes(q),
      );
    }

    return [...items].sort((a, b) => {
      if (sortBy === 'nearest') return a.distance - b.distance;
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'popular') return b.views - a.views;
      return b.timestamp - a.timestamp;
    });
  }, [search, category, maxDistance, maxPrice, sortBy]);

  const hasActiveFilters = category !== null || maxDistance > 0 || maxPrice.trim() !== '';

  const clearFilters = () => {
    setCategory(null);
    setMaxDistance(0);
    setMaxPrice('');
  };

  const sortLabel = SORT_OPTIONS.find((option) => option.value === sortBy);

  return (
    <div className="py-6 md:py-10">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20 space-y-5">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={1.5} />
              <input
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-surface text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary"
                placeholder={t('searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="space-y-4">
              {/* Category Dropdown */}
              <div>
                <label className="label-uppercase mb-2 block">
                  {locale === 'zh-CN' ? '类别' : 'Category'}
                </label>
                <div className="relative">
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border bg-surface text-sm text-foreground transition-colors hover:border-primary/50"
                    onClick={() => setOpenDropdown(openDropdown === 'cat' ? null : 'cat')}
                  >
                    <span>{category ? t(`categories.${category}`) : (locale === 'zh-CN' ? '全部' : 'All')}</span>
                    <ChevronDown className={`w-4 h-4 text-muted transition-transform ${openDropdown === 'cat' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'cat' && (
                    <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-surface shadow-lg overflow-hidden">
                      <button
                        className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                          category === null ? 'bg-primary-light text-primary' : 'text-foreground hover:bg-bg'
                        }`}
                        onClick={() => { setCategory(null); setOpenDropdown(null); }}
                      >
                        {locale === 'zh-CN' ? '全部' : 'All'}
                      </button>
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.key}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                            category === cat.key ? 'bg-primary-light text-primary' : 'text-foreground hover:bg-bg'
                          }`}
                          onClick={() => { setCategory(cat.key === category ? null : cat.key); setOpenDropdown(null); }}
                        >
                          {t(`categories.${cat.key}`)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Distance Dropdown */}
              <div>
                <label className="label-uppercase mb-2 block">
                  {locale === 'zh-CN' ? '距离' : 'Distance'}
                </label>
                <div className="relative">
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border bg-surface text-sm text-foreground transition-colors hover:border-primary/50"
                    onClick={() => setOpenDropdown(openDropdown === 'dist' ? null : 'dist')}
                  >
                    <span>{maxDistance === 0
                      ? locale === 'zh-CN' ? '全部距离' : 'All distances'
                      : DISTANCE_OPTIONS.find((d) => d.value === maxDistance)?.[locale === 'zh-CN' ? 'zh' : 'en'] || ''}</span>
                    <ChevronDown className={`w-4 h-4 text-muted transition-transform ${openDropdown === 'dist' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'dist' && (
                    <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-surface shadow-lg overflow-hidden max-h-64 overflow-y-auto">
                      {DISTANCE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                            maxDistance === opt.value ? 'bg-primary-light text-primary' : 'text-foreground hover:bg-bg'
                          }`}
                          onClick={() => { setMaxDistance(opt.value); setOpenDropdown(null); }}
                        >
                          {locale === 'zh-CN' ? opt.zh : opt.en}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Price Input */}
              <div>
                <label className="label-uppercase mb-2 block">
                  {locale === 'zh-CN' ? '最高价格 (¥)' : 'Max price (¥)'}
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder={locale === 'zh-CN' ? '不限' : 'No limit'}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary-light transition-colors"
                  onClick={clearFilters}
                >
                  <X className="w-3.5 h-3.5" />
                  {locale === 'zh-CN' ? '清除筛选' : 'Clear filters'}
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile Header */}
          <div className="md:hidden space-y-3 mb-5">
            <h1 className="heading-lg">
              {locale === 'zh-CN' ? '领养宝贝' : 'Adopt Treasures'}
            </h1>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={1.5} />
                <input
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary"
                  placeholder={t('searchPlaceholder')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  hasActiveFilters
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-border bg-surface text-foreground'
                }`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                {locale === 'zh-CN' ? '筛选' : 'Filters'}
              </button>
            </div>
            {showFilters && (
              <div className="space-y-3 p-3 rounded-lg border border-border bg-surface">
                {/* Category Dropdown Mobile */}
                <div>
                  <label className="label-text mb-1.5 block">
                    {locale === 'zh-CN' ? '类别' : 'Category'}
                  </label>
                  <div className="relative">
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border bg-white text-sm text-foreground"
onClick={() => setOpenDropdown(openDropdown === 'cat' ? null : 'cat')}
                    >
                      <span>{category ? t(`categories.${category}`) : (locale === 'zh-CN' ? '全部' : 'All')}</span>
<ChevronDown className={`w-4 h-4 text-muted transition-transform ${openDropdown === 'cat' ? 'rotate-180' : ''}`} />
                    </button>
{openDropdown === 'cat' && (
                      <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-white shadow-lg overflow-hidden">
                        <button
                          className={`w-full text-left px-3 py-2 text-sm ${
                            category === null ? 'bg-primary-light text-primary' : 'text-foreground hover:bg-bg'
                          }`}
onClick={() => { setCategory(null); setOpenDropdown(null); }}
                        >
                          {locale === 'zh-CN' ? '全部' : 'All'}
                        </button>
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.key}
                            className={`w-full text-left px-3 py-2 text-sm ${
                              category === cat.key ? 'bg-primary-light text-primary' : 'text-foreground hover:bg-bg'
                            }`}
onClick={() => { setCategory(cat.key === category ? null : cat.key); setOpenDropdown(null); }}
                          >
                            {t(`categories.${cat.key}`)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Distance Dropdown Mobile */}
                <div>
                  <label className="label-text mb-1.5 block">
                    {locale === 'zh-CN' ? '距离' : 'Distance'}
                  </label>
                  <div className="relative">
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border bg-white text-sm text-foreground"
                      onClick={() => setOpenDropdown(openDropdown === 'dist' ? null : 'dist')}
                    >
                      <span>{maxDistance === 0
                        ? locale === 'zh-CN' ? '全部距离' : 'All distances'
                        : DISTANCE_OPTIONS.find((d) => d.value === maxDistance)?.[locale === 'zh-CN' ? 'zh' : 'en'] || ''}</span>
                      <ChevronDown className={`w-4 h-4 text-muted transition-transform ${openDropdown === 'dist' ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === 'dist' && (
                      <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-white shadow-lg overflow-hidden max-h-56 overflow-y-auto">
                        {DISTANCE_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            className={`w-full text-left px-3 py-2 text-sm ${
                              maxDistance === opt.value ? 'bg-primary-light text-primary' : 'text-foreground hover:bg-bg'
                            }`}
                            onClick={() => { setMaxDistance(opt.value); setOpenDropdown(null); }}
                          >
                            {locale === 'zh-CN' ? opt.zh : opt.en}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Input Mobile */}
                <div>
                  <label className="label-text mb-1.5 block">
                    {locale === 'zh-CN' ? '最高价格 (¥)' : 'Max price (¥)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder={locale === 'zh-CN' ? '不限' : 'No limit'}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm text-foreground outline-none"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>

                {hasActiveFilters && (
                  <button
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary-light transition-colors"
                    onClick={clearFilters}
                  >
                    <X className="w-3.5 h-3.5" />
                    {locale === 'zh-CN' ? '清除筛选' : 'Clear filters'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Title Desktop */}
          <div className="hidden md:flex items-center justify-between mb-5">
            <h1 className="heading-lg">
              {locale === 'zh-CN' ? '领养宝贝' : 'Adopt Treasures'}
            </h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-sm text-foreground transition-colors hover:border-primary/50"
                  onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
                >
                  <span>{locale === 'zh-CN' ? sortLabel?.zh : sortLabel?.en}</span>
                  <ChevronDown className={`w-4 h-4 text-muted transition-transform ${openDropdown === 'sort' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'sort' && (
                  <div className="absolute right-0 z-50 mt-1 w-48 rounded-lg border border-border bg-surface shadow-lg overflow-hidden">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                          sortBy === option.value ? 'bg-primary-light text-primary' : 'text-foreground hover:bg-bg'
                        }`}
                        onClick={() => { setSortBy(option.value); setOpenDropdown(null); }}
                      >
                        {locale === 'zh-CN' ? option.zh : option.en}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {hasActiveFilters && (
                <button
                  className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  onClick={clearFilters}
                >
                  <X className="w-3.5 h-3.5" />
                  {locale === 'zh-CN' ? '清除筛选' : 'Clear filters'}
                </button>
              )}
            </div>
          </div>

          {/* Active filters pill */}
          {hasActiveFilters && (
            <div className="hidden md:flex flex-wrap gap-2 mb-4">
              {category !== null && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-medium">
                  {category ? t(`categories.${category}`) : (locale === 'zh-CN' ? '全部类别' : 'All categories')}
                  <button onClick={() => setCategory(null)} className="hover:opacity-70">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {maxDistance > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-medium">
                  {maxDistance === 0
                    ? locale === 'zh-CN' ? '全部距离' : 'All distances'
                    : DISTANCE_OPTIONS.find((d) => d.value === maxDistance)?.[locale === 'zh-CN' ? 'zh' : 'en'] || ''}
                  <button onClick={() => setMaxDistance(0)} className="hover:opacity-70">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {maxPrice.trim() && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-medium">
                  {maxPrice === '0'
                    ? locale === 'zh-CN' ? '仅免费' : 'Free only'
                    : locale === 'zh-CN' ? `≤¥${maxPrice}` : `≤¥${maxPrice}`
                  }
                  <button onClick={() => setMaxPrice('')} className="hover:opacity-70">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted">
              {filtered.length} {locale === 'zh-CN' ? '个结果' : 'results'}
            </span>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {filtered.map((item, idx) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  index={idx}
                  saved={isSaved(item.id)}
                  onSave={(i) => {
                    if (isSaved(i.id)) removeFromWishlist(i.id);
                    else addToWishlist({ id: i.id, name: i.name, photo: i.photo });
                  }}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title={locale === 'zh-CN' ? '没有找到宝贝' : 'No treasures found'}
              description={
                locale === 'zh-CN'
                  ? '试试调整筛选条件，或去看看其他页面'
                  : 'Try adjusting your filters or check other pages'
              }
              actionLabel={locale === 'zh-CN' ? '清除筛选' : 'Clear filters'}
              onAction={clearFilters}
            />
          )}
        </div>
      </div>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(creds) => { login(creds); setShowLogin(false); }}
        onRegister={(details) => { register(details); setShowLogin(false); }}
      />
    </div>
  );
}
