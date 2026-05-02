import { NextRequest, NextResponse } from 'next/server';
import { getItemRepository } from '@/lib/repository';
import type { Item } from '@/lib/types';

function toItemResponse(item: Item): Record<string, unknown> {
  return {
    id: item.id,
    name: item.name,
    story: item.story,
    ownerNote: item.ownerNote,
    photo: item.photo,
    category: item.category,
    condition: item.condition,
    district: item.district,
    city: item.city,
    distance: item.distance,
    status: item.status,
    views: item.views,
    timestamp: item.timestamp,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const id = searchParams.get('id');
  const top = searchParams.get('top');

  const repo = getItemRepository();

  if (id) {
    const item = repo.getById(Number(id));
    if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    repo.incrementViews(Number(id));
    return NextResponse.json({ item: toItemResponse(item) });
  }

  if (top) {
    const items = repo.getTop(Number(top));
    return NextResponse.json({ items: items.map(toItemResponse) });
  }

  let items = repo.getAvailable();

  if (category) {
    items = items.filter((i) => i.category === category);
  }

  if (search) {
    items = repo.search(search);
  }

  return NextResponse.json({ items: items.map(toItemResponse) });
}
