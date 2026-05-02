import type { Item, ItemCategory, ItemStatus, ItemCondition } from '@/lib/types';
import { ITEMS } from '@/lib/seed-data';

export interface ItemRepository {
  getAll(): Item[];
  getById(id: number): Item | undefined;
  getByCategory(category: ItemCategory): Item[];
  getAvailable(): Item[];
  getTop(n: number): Item[];
  search(query: string): Item[];
  incrementViews(id: number): void;
}

class MockItemRepository implements ItemRepository {
  private items = ITEMS;

  getAll(): Item[] {
    return [...this.items];
  }

  getById(id: number): Item | undefined {
    return this.items.find((item) => item.id === id);
  }

  getByCategory(category: ItemCategory): Item[] {
    return this.items.filter((item) => item.category === category);
  }

  getAvailable(): Item[] {
    return this.items.filter((item) => item.status !== 'found');
  }

  getTop(n: number): Item[] {
    return [...this.items]
      .sort((a, b) => b.views - a.views)
      .slice(0, n);
  }

  search(query: string): Item[] {
    const q = query.toLowerCase();
    return this.items.filter(
      (item) =>
        (item.name.zh + item.name.en + item.story.zh + item.story.en)
          .toLowerCase()
          .includes(q),
    );
  }

  incrementViews(id: number): void {
    const item = this.items.find((i) => i.id === id);
    if (item) item.views++;
  }
}

let repository: ItemRepository | null = null;

export function getItemRepository(): ItemRepository {
  if (!repository) {
    repository = new MockItemRepository();
  }
  return repository;
}

export function resetRepository(): void {
  repository = null;
}
