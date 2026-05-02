import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'wishlist-item-ids';

function getWishlistIds(request: NextRequest): number[] {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie) return [];
  try {
    return JSON.parse(cookie.value);
  } catch {
    return [];
  }
}

function setWishlistCookie(cookieStore: NextRequest['cookies'], ids: number[]) {
  const response = NextResponse.next();
  response.cookies.set(COOKIE_NAME, JSON.stringify(ids), {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export async function GET(request: NextRequest) {
  const ids = getWishlistIds(request);
  return NextResponse.json({ ids });
}

export async function POST(request: NextRequest) {
  const { itemId } = await request.json();
  if (!itemId || typeof itemId !== 'number') {
    return NextResponse.json({ error: 'Invalid item ID' }, { status: 400 });
  }

  const ids = getWishlistIds(request);
  if (ids.includes(itemId)) {
    return NextResponse.json({ ids, action: 'already_saved' });
  }

  ids.push(itemId);
  const response = NextResponse.json({ ids, action: 'saved' });
  response.cookies.set(COOKIE_NAME, JSON.stringify(ids), {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const itemId = searchParams.get('itemId');
  if (!itemId) {
    return NextResponse.json({ error: 'Missing itemId' }, { status: 400 });
  }

  let ids = getWishlistIds(request);
  ids = ids.filter((id) => id !== Number(itemId));
  const response = NextResponse.json({ ids, action: 'removed' });
  response.cookies.set(COOKIE_NAME, JSON.stringify(ids), {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
