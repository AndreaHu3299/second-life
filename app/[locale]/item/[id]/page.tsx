'use client';

import { use } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import LoginModal from '@/components/LoginModal';
import SuccessModal from '@/components/SuccessModal';
import { useAuth } from '@/hooks/useAuth';
import { ITEMS } from '@/lib/seed-data';
import { formatDistance, getLocalised } from '@/lib/types';
import type { AppLocale } from '@/lib/types';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Heart, MapPin, Eye, Shield, Users, Calendar } from 'lucide-react';

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations();
  const locale = useLocale() as AppLocale;
  const { isLoggedIn, addToWishlist, removeFromWishlist, isSaved, login, register } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const item = ITEMS.find((i) => i.id === Number(id));
  if (!item) return notFound();

  const saved = isSaved(item.id);
  const timeStr = (() => {
    const diff = Date.now() - item.timestamp;
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return days === 0
      ? locale === 'zh-CN' ? '今天' : 'Today'
      : days === 1
        ? locale === 'zh-CN' ? '昨天' : 'Yesterday'
        : locale === 'zh-CN' ? `${days}天前` : `${days} days ago`;
  })();

  const conditionLabel =
    item.condition === 'likeNew'
      ? locale === 'zh-CN' ? '如新' : 'Like New'
      : item.condition === 'gentleUse'
        ? locale === 'zh-CN' ? '轻微使用痕迹' : 'Gentle Signs of Use'
        : locale === 'zh-CN' ? '岁月痕迹' : 'Has Character';

  const statusLabel =
    item.status === 'found'
      ? locale === 'zh-CN' ? '已找到新家' : 'Adopted'
      : item.status === 'waiting'
        ? locale === 'zh-CN' ? '等待领养' : 'Available'
        : '';

  const handleSave = () => {
    if (saved) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist({ id: item.id, name: item.name, photo: item.photo });
    }
  };

  const handleAdopt = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    setShowSuccess(true);
  };

  return (
    <div className="py-4 md:py-8">
      {/* Back Button */}
      <Link
        href="/adopt"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground mb-5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
        {locale === 'zh-CN' ? '返回列表' : 'Back to list'}
      </Link>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        {/* Image */}
        <div className="relative rounded-xl overflow-hidden bg-bg aspect-square md:aspect-[4/5]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.photo})` }}
          />
          {statusLabel && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-md text-xs font-medium bg-surface/90 backdrop-blur-sm text-foreground">
              {statusLabel}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
            {getLocalised(item.name, locale)}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted font-medium mb-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              {getLocalised(item.district, locale)}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" strokeWidth={1.5} />
              {timeStr}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" strokeWidth={1.5} />
              {item.views}
            </span>
          </div>

          {/* Condition */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary-light text-primary text-sm font-medium mb-6">
            {conditionLabel}
          </div>

          {/* Story */}
          <div className="bg-secondary-light px-5 py-4 rounded-lg mb-4">
            <p className="text-sm leading-relaxed text-foreground">
              {getLocalised(item.story, locale)}
            </p>
          </div>

          {/* Owner Note */}
          <div className="bg-[#FFF9F0] px-5 py-4 rounded-lg mb-5">
            <div className="label-uppercase mb-1.5">
              {t('ownerNote')}
            </div>
            <p className="text-sm leading-relaxed text-foreground">
              {getLocalised(item.ownerNote, locale)}
            </p>
          </div>

          {/* Distance */}
          <p className="text-sm text-muted mb-6 flex items-center gap-1.5">
            <MapPin className="w-4 h-4" strokeWidth={1.5} />
            {formatDistance(item.distance, locale)}
          </p>

          {/* Owner Card */}
          <div className="bg-surface border border-border rounded-xl px-4 py-3.5 mb-6">
            <p className="label-uppercase mb-3">{locale === 'zh-CN' ? '关于主人' : 'About the Owner'}</p>
            <div className="flex items-start gap-3">
              <div className="w-25 h-25 rounded-full overflow-hidden bg-bg shrink-0">
                <img
                  src={item.owner.avatarUrl}
                  alt={item.owner.nickname}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground mb-0.5">{item.owner.nickname}</p>
                <p className="text-xs text-muted leading-relaxed">
                  {getLocalised(item.owner.bio, locale)}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-auto">
            <button
              className="flex-1 px-5 py-2.5 rounded-lg bg-foreground text-white text-sm font-medium transition-colors hover:bg-foreground/90"
              onClick={handleAdopt}
            >
              {t('wantAdopt')}
            </button>
            <button
              className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors flex items-center gap-1.5 ${
                saved
                  ? 'border-primary bg-primary-light text-primary'
                  : 'border-border bg-surface text-foreground hover:bg-bg'
              }`}
              onClick={handleSave}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-primary' : ''}`} strokeWidth={2} />
              {t('save')}
            </button>
          </div>

          {/* Safety Notes */}
          <div className="space-y-3 mt-6 pt-6 border-t border-border">
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-muted mt-0.5 shrink-0" strokeWidth={1.5} />
              <p className="text-xs text-muted">{t('privacyNote')}</p>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-4 h-4 text-muted mt-0.5 shrink-0" strokeWidth={1.5} />
              <p className="text-xs text-muted">{t('safetyTip')}</p>
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(creds) => { login(creds); setShowLogin(false); }}
        onRegister={(details) => { register(details); setShowLogin(false); }}
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={locale === 'zh-CN' ? '领养请求已发送！主人会很快回复你的 💚' : 'Adoption request sent! The owner will reply soon 💚'}
      />
    </div>
  );
}
