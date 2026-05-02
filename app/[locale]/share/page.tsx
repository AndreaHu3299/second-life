'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import LoginModal from '@/components/LoginModal';
import SuccessModal from '@/components/SuccessModal';
import { useAuth } from '@/hooks/useAuth';
import { CATEGORIES } from '@/lib/seed-data';
import { type ItemCategory, type ItemCondition } from '@/lib/types';
import { ChevronLeft, ChevronRight, Tag, FileText, Check, Upload } from 'lucide-react';

const CONDITIONS: { key: ItemCondition; zh: string; en: string }[] = [
  { key: 'likeNew', zh: '如新', en: 'Like New' },
  { key: 'gentleUse', zh: '轻微使用痕迹', en: 'Gentle Signs of Use' },
  { key: 'hasCharacter', zh: '岁月痕迹', en: 'Has Character' },
];

const DISTRICTS = [
  { zh: '朝阳区', en: 'Chaoyang' },
  { zh: '海淀区', en: 'Haidian' },
  { zh: '西城区', en: 'Xicheng' },
  { zh: '东城区', en: 'Dongcheng' },
  { zh: '其他', en: 'Other' },
];

interface ShareDraft {
  nameZh: string;
  nameEn: string;
  storyZh: string;
  storyEn: string;
  ownerNoteZh: string;
  ownerNoteEn: string;
  category: ItemCategory;
  condition: ItemCondition;
  district: number;
  photoUrl: string;
}

const INITIAL_DRAFT: ShareDraft = {
  nameZh: '',
  nameEn: '',
  storyZh: '',
  storyEn: '',
  ownerNoteZh: '',
  ownerNoteEn: '',
  category: 'others',
  condition: 'likeNew',
  district: 0,
  photoUrl: '',
};

const STORAGE_KEY = 'share-draft';

export default function SharePage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { isLoggedIn, login, register } = useAuth();
  const [showLogin, setShowLogin] = useState(!isLoggedIn);
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<ShareDraft>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...INITIAL_DRAFT, ...JSON.parse(saved) } : INITIAL_DRAFT;
    } catch {
      return INITIAL_DRAFT;
    }
  });

  const updateDraft = (field: keyof ShareDraft, value: string) => {
    const next = { ...draft, [field]: value };
    setDraft(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleSubmit = () => {
    localStorage.removeItem(STORAGE_KEY);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    router.push('/my-space');
  };

  const inputClass =
    'w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary';

  if (!isLoggedIn) {
    return (
      <div className="py-6 md:py-10 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bg mb-4">
          <FileText className="w-5 h-5 text-muted" strokeWidth={1.5} />
        </div>
        <h3 className="heading-sm mb-1.5">
          {locale === 'zh-CN' ? '发布你的宝贝' : 'Share Your Treasure'}
        </h3>
        <p className="body-muted font-normal mb-6">
          {locale === 'zh-CN' ? '登录后可以发布宝贝档案，给它们找新家' : 'Log in to create a profile for your treasure'}
        </p>
        <button
          className="px-5 py-2.5 rounded-lg bg-foreground text-white text-sm font-medium transition-colors hover:bg-foreground/90"
          onClick={() => setShowLogin(true)}
        >
          {t('guestLogin')}
        </button>
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onLogin={(creds) => { login(creds); setShowLogin(false); }}
          onRegister={(details) => { register(details); setShowLogin(false); }}
        />
      </div>
    );
  }

  const steps = [
    { label: locale === 'zh-CN' ? '基本信息' : 'Info', icon: Tag },
    { label: locale === 'zh-CN' ? '故事' : 'Story', icon: FileText },
    { label: locale === 'zh-CN' ? '确认' : 'Review', icon: Check },
  ];

  return (
    <div className="py-6 md:py-10">
      <div className="max-w-2xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isComplete = step > i + 1;
            return (
              <div key={i} className="flex items-center flex-1">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isComplete
                      ? 'bg-foreground text-white'
                      : step === i + 1
                        ? 'bg-primary-light text-primary'
                        : 'text-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-[1px] mx-3 ${
                      step > i + 1 ? 'bg-foreground' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div>
            <h2 className="heading-lg mb-6">
              {locale === 'zh-CN' ? '宝贝的基本信息' : 'Basic Info'}
            </h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-text mb-1.5 block">
                    {locale === 'zh-CN' ? '名字（中文）' : 'Name (Chinese)'}
                  </label>
                  <input
                    className={inputClass}
                    placeholder="给宝贝起个名字"
                    value={draft.nameZh}
                    onChange={(e) => updateDraft('nameZh', e.target.value)}
                  />
                </div>
                <div>
                  <label className="label-text mb-1.5 block">
                    {locale === 'zh-CN' ? '名字（英文）' : 'Name (English)'}
                  </label>
                  <input
                    className={inputClass}
                    placeholder="A name for your treasure"
                    value={draft.nameEn}
                    onChange={(e) => updateDraft('nameEn', e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="label-text mb-2 block">
                  {locale === 'zh-CN' ? '类别' : 'Category'}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.key}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        draft.category === cat.key
                          ? 'border-primary bg-primary-light text-primary'
                          : 'border-border bg-surface text-foreground hover:bg-bg'
                      }`}
                      onClick={() => updateDraft('category', cat.key)}
                    >
                      {t(`categories.${cat.key}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="label-text mb-2 block">
                  {locale === 'zh-CN' ? '成色' : 'Condition'}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {CONDITIONS.map((c) => (
                    <button
                      key={c.key}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        draft.condition === c.key
                          ? 'border-primary bg-primary-light text-primary'
                          : 'border-border bg-surface text-foreground hover:bg-bg'
                      }`}
                      onClick={() => updateDraft('condition', c.key)}
                    >
                      {locale === 'zh-CN' ? c.zh : c.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* District */}
              <div>
                <label className="label-text mb-1.5 block">
                  {locale === 'zh-CN' ? '所在地区' : 'District'}
                </label>
                <select
                  className={inputClass}
                  value={draft.district}
                  onChange={(e) => updateDraft('district', e.target.value)}
                >
                  {DISTRICTS.map((d, idx) => (
                    <option key={idx} value={idx}>
                      {locale === 'zh-CN' ? d.zh : d.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Photo Upload Placeholder */}
              <div>
                <label className="label-text mb-2 block">
                  {locale === 'zh-CN' ? '照片' : 'Photos'}
                </label>
                <div className="flex items-center justify-center w-32 h-32 rounded-lg border-2 border-dashed border-border bg-bg hover:border-primary transition-colors cursor-pointer">
                  <div className="text-center">
                    <Upload className="w-6 h-6 text-muted-light mx-auto mb-2" strokeWidth={1.5} />
                    <span className="text-xs text-muted">{locale === 'zh-CN' ? '上传' : 'Upload'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Story */}
        {step === 2 && (
          <div>
            <h2 className="heading-lg mb-1">
              {locale === 'zh-CN' ? '宝贝的故事' : 'Your Treasure\'s Story'}
            </h2>
            <p className="text-sm text-muted mb-6">
              {locale === 'zh-CN' ? '用第一人称讲述宝贝的故事，让新主人了解它' : 'Tell your treasure\'s story in first person'}
            </p>
            <div className="space-y-5">
              <div>
                <label className="label-text mb-1.5 block">
                  {locale === 'zh-CN' ? '故事（中文）' : 'Story (Chinese)'}
                </label>
                <textarea
                  className={`${inputClass} resize-y min-h-[100px] font-inherit`}
                  placeholder="嗨！我是..."
                  value={draft.storyZh}
                  onChange={(e) => updateDraft('storyZh', e.target.value)}
                />
              </div>
              <div>
                <label className="label-text mb-1.5 block">
                  {locale === 'zh-CN' ? '故事（英文）' : 'Story (English)'}
                </label>
                <textarea
                  className={`${inputClass} resize-y min-h-[100px] font-inherit`}
                  placeholder="Hi! I am..."
                  value={draft.storyEn}
                  onChange={(e) => updateDraft('storyEn', e.target.value)}
                />
              </div>
              <div>
                <label className="label-text mb-1.5 block">
                  {locale === 'zh-CN' ? '前主人的话' : 'From Previous Owner'}
                </label>
                <textarea
                  className={`${inputClass} resize-y min-h-[60px] font-inherit`}
                  placeholder={locale === 'zh-CN' ? '为什么让宝贝离开？' : 'Why is your treasure looking for a new home?'}
                  value={draft.ownerNoteZh}
                  onChange={(e) => updateDraft('ownerNoteZh', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div>
            <h2 className="heading-lg mb-6">
              {locale === 'zh-CN' ? '确认发布' : 'Review & Post'}
            </h2>
            <div className="rounded-lg border border-border p-5 mb-6">
              <div className="mb-4">
                <span className="label-uppercase">
                  {locale === 'zh-CN' ? '名字' : 'Name'}
                </span>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  {draft.nameZh} {draft.nameEn && `/ ${draft.nameEn}`}
                </p>
              </div>
              {draft.storyZh && (
                <div className="mb-4">
                  <span className="label-uppercase">
                    {locale === 'zh-CN' ? '故事' : 'Story'}
                  </span>
                  <p className="text-sm text-muted leading-relaxed mt-0.5 line-clamp-3">
                    {draft.storyZh}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <span className="label-uppercase">
                    {locale === 'zh-CN' ? '成色' : 'Condition'}
                  </span>
                  <p className="text-sm text-foreground mt-0.5">
                    {CONDITIONS.find((c) => c.key === draft.condition)?.[locale === 'zh-CN' ? 'zh' : 'en']}
                  </p>
                </div>
                <div>
                  <span className="label-uppercase">
                    {locale === 'zh-CN' ? '地区' : 'District'}
                  </span>
                  <p className="text-sm text-foreground mt-0.5">
                    {DISTRICTS[Number(draft.district)]?.[locale === 'zh-CN' ? 'zh' : 'en']}
                  </p>
                </div>
                <div>
                  <span className="label-uppercase">
                    {locale === 'zh-CN' ? '类别' : 'Category'}
                  </span>
                  <p className="text-sm text-foreground mt-0.5">
                    {t(`categories.${draft.category}`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          {step > 1 ? (
            <button
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border bg-surface text-sm font-medium text-foreground transition-colors hover:bg-bg"
              onClick={() => setStep((s) => s - 1)}
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              {locale === 'zh-CN' ? '上一步' : 'Previous'}
            </button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <button
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-foreground text-white text-sm font-medium transition-colors hover:bg-foreground/90"
              onClick={() => setStep((s) => s + 1)}
            >
              {locale === 'zh-CN' ? '下一步' : 'Next'}
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          ) : (
            <button
              className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium transition-colors hover:bg-primary-dark"
              onClick={handleSubmit}
            >
              {locale === 'zh-CN' ? '发布宝贝' : 'Post Treasure'}
            </button>
          )}
        </div>

        <SuccessModal
          isOpen={showSuccess}
          onClose={handleSuccessClose}
          message={locale === 'zh-CN' ? '宝贝档案已保存！正在等待审核 💚' : 'Treasure profile saved! Awaiting review 💚'}
        />
      </div>
    </div>
  );
}
