'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';

interface UserProfile {
  nickname: string;
  email?: string;
  phone?: string;
  city?: string;
  district?: string;
  bio?: string;
  joinedAt: number;
}

const STORAGE_SESSION = 'imagineers-session';
const STORAGE_WISHLIST = 'imagineers-wishlist';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [wishlist, setWishlist] = useState<Array<{ id: number; name: { zh: string; en: string }; photo: string }>>([]);
  const locale = useLocale() as 'zh-CN' | 'en';

  useEffect(() => {
    const session = localStorage.getItem(STORAGE_SESSION);
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setIsLoggedIn(true);
        setUser(parsed);
      } catch {
        localStorage.removeItem(STORAGE_SESSION);
      }
    }

    const wl = localStorage.getItem(STORAGE_WISHLIST);
    if (wl) {
      try {
        setWishlist(JSON.parse(wl));
      } catch {
        localStorage.removeItem(STORAGE_WISHLIST);
      }
    }
  }, []);

  const login = useCallback((credentials: Record<string, string>) => {
    const session: UserProfile = {
      nickname: credentials.nickname || credentials.email?.split('@')[0] || (locale === 'zh-CN' ? '邻居' : 'Neighbor'),
      email: credentials.email,
      phone: credentials.phone,
      city: credentials.city,
      district: credentials.district,
      bio: credentials.bio,
      joinedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
    setUser(session);
    setIsLoggedIn(true);
  }, [locale]);

  const register = useCallback((details: Record<string, string>) => {
    login(details);
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_SESSION);
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  const addToWishlist = useCallback((item: { id: number; name: { zh: string; en: string }; photo: string }) => {
    setWishlist((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      const next = [...prev, item];
      localStorage.setItem(STORAGE_WISHLIST, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromWishlist = useCallback((id: number) => {
    setWishlist((prev) => {
      const next = prev.filter((i) => i.id !== id);
      localStorage.setItem(STORAGE_WISHLIST, JSON.stringify(next));
      return next;
    });
  }, []);

  const isSaved = useCallback((id: number) => {
    return wishlist.some((i) => i.id === id);
  }, [wishlist]);

  return {
    isLoggedIn,
    user,
    wishlist,
    login,
    register,
    logout,
    addToWishlist,
    removeFromWishlist,
    isSaved,
  };
}
