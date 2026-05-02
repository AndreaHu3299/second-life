import { NextResponse } from 'next/server';

export function requireProtectedAction(session: { user?: { name?: string | null } | null } | null) {
  if (!session?.user) {
    return NextResponse.json(
      { error: 'authentication_required', message: 'Please log in to perform this action' },
      { status: 401 },
    );
  }
  return null;
}

export function withProtectedHandler(
  handler: (request: Request, session: NonNullable<Parameters<typeof requireProtectedAction>[0]>) => Promise<NextResponse>,
  session: Parameters<typeof requireProtectedAction>[0],
) {
  const authError = requireProtectedAction(session);
  if (authError) return authError;
  return handler;
}
