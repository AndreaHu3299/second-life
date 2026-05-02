import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { itemId, message } = await request.json();

  if (!itemId) {
    return NextResponse.json({ error: 'Missing itemId' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    requestId: `mock-${Date.now()}`,
    message: message || 'Adoption request sent! The owner will reply soon 💚',
  });
}
