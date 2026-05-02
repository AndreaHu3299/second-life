export type ItemCategory = 'digital' | 'home' | 'books' | 'fashion' | 'toys' | 'others';
export type ItemCondition = 'likeNew' | 'gentleUse' | 'hasCharacter';
export type ItemStatus = 'waiting' | 'inProgress' | 'found' | 'withdrawn' | 'draft';

export type AppLocale = 'zh-CN' | 'en';
export type InternalLocale = 'zh' | 'en';

export function toInternalLocale(locale: AppLocale): InternalLocale {
  return locale === 'zh-CN' ? 'zh' : 'en';
}

export interface BilingualString {
  zh: string;
  en: string;
}

export interface Owner {
  id: number;
  nickname: string;
  avatarUrl: string;
  bio: BilingualString;
}

export interface Item {
  id: number;
  photo: string;
  name: BilingualString;
  story: BilingualString;
  ownerNote: BilingualString;
  category: ItemCategory;
  condition: ItemCondition;
  district: BilingualString;
  city: BilingualString;
  distance: number;
  price: number;
  timestamp: number;
  status: ItemStatus;
  views: number;
  owner: Owner;
}

export interface CategoryDef {
  key: ItemCategory;
  icon: string;
}

export const CATEGORIES: CategoryDef[] = [
  { key: 'digital', icon: '💻' },
  { key: 'home', icon: '🏠' },
  { key: 'books', icon: '📚' },
  { key: 'fashion', icon: '👕' },
  { key: 'toys', icon: '🧸' },
  { key: 'others', icon: '✨' },
];

export function formatDistance(meters: number, lang: 'zh-CN' | 'en'): string {
  if (meters < 1000) {
    return lang === 'zh-CN' ? `约${meters}m` : `About ${meters}m`;
  }
  const km = (meters / 1000).toFixed(1);
  return lang === 'zh-CN' ? `约${km}km` : `About ${km}km`;
}

export function formatTimeAgo(timestamp: number, lang: 'zh-CN' | 'en'): string {
  const diff = Date.now() - timestamp;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  if (days === 0) return lang === 'zh-CN' ? '今天' : 'Today';
  if (days === 1) return lang === 'zh-CN' ? '1天前' : '1 day ago';
  return lang === 'zh-CN' ? `${days}天前` : `${days} days ago`;
}

export function getTopItems(items: Item[], n = 5): Item[] {
  return [...items].sort((a, b) => b.views - a.views).slice(0, n);
}

export function getAvailableItems(items: Item[]): Item[] {
  return items.filter((i) => i.status !== 'found');
}

export function getItemById(items: Item[], id: number): Item | undefined {
  return items.find((item) => item.id === id);
}

export function filterItemsByCategory(items: Item[], category: ItemCategory | null): Item[] {
  const available = getAvailableItems(items);
  if (!category) return available;
  return available.filter((i) => i.category === category);
}

export function getLocalised(b: BilingualString, locale: AppLocale): string {
  return b[toInternalLocale(locale)];
}
