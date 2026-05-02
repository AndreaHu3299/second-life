import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function getSession() {
  return getServerSession(authOptions);
}

export async function requireSession(redirectUrl = '/login') {
  const session = await getSession();
  if (!session?.user) {
    return {
      authenticated: false as const,
      redirectUrl,
    };
  }
  return {
    authenticated: true as const,
    session,
  };
}

export async function isGuest(): Promise<boolean> {
  const session = await getSession();
  return !session?.user;
}
