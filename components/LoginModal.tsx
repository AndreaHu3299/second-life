'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MessageSquare } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (credentials: Record<string, string>) => void;
  onRegister: (details: Record<string, string>) => void;
  initialMode?: 'login' | 'register';
}

export default function LoginModal({ isOpen, onClose, onLogin, onRegister, initialMode = 'login' }: LoginModalProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [loginType, setLoginType] = useState<'phone' | 'email'>('email');
  const [form, setForm] = useState({
    phone: '', code: '', email: '', password: '', nickname: '', city: '', district: '', bio: '',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [initialMode, isOpen]);

  const handleLogin = () => {
    onLogin({
      nickname: form.nickname || form.email?.split('@')[0] || (form.phone ? form.phone.slice(-4) : locale === 'zh-CN' ? '邻居' : 'Neighbor'),
      email: form.email,
      phone: form.phone,
      city: form.city,
      district: form.district,
    });
  };

  const handleRegister = () => {
    onRegister({
      nickname: form.nickname,
      email: form.email,
      password: form.password,
      phone: form.phone,
      city: form.city,
      district: form.district,
      bio: form.bio,
    });
  };

  const inputClass =
    'w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center z-[100] p-0 md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="w-full max-w-md bg-surface rounded-t-xl md:rounded-xl p-5 pt-6 pb-8 relative max-h-[90vh] overflow-y-auto md:shadow-lg"
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-muted hover:bg-bg"
              onClick={onClose}
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>

            <h2 className="heading-md mb-5">
              {mode === 'login' ? t('loginTitle') : t('registerTitle')}
            </h2>

            {mode === 'login' ? (
              <>
                <div className="flex gap-1 mb-5 bg-bg rounded-lg p-1">
                  <button
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium transition-all ${
                      loginType === 'phone'
                        ? 'bg-surface text-foreground shadow-sm'
                        : 'text-muted'
                    }`}
                    onClick={() => setLoginType('phone')}
                  >
                    <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {t('loginPhone')}
                  </button>
                  <button
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium transition-all ${
                      loginType === 'email'
                        ? 'bg-surface text-foreground shadow-sm'
                        : 'text-muted'
                    }`}
                    onClick={() => setLoginType('email')}
                  >
                    <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {t('loginEmail')}
                  </button>
                </div>

                <div className="flex flex-col gap-3 mb-4">
                  {loginType === 'phone' ? (
                    <>
                      <input className={inputClass} placeholder={locale === 'zh-CN' ? '手机号 (测试中可随便填)' : 'Phone number (Can be anything during testing)'} value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
                      <input className={inputClass} placeholder={locale === 'zh-CN' ? '验证码 (测试中可随便填)' : 'Verification code (Can be anything during testing)'} value={form.code} onChange={(e) => updateField('code', e.target.value)} />
                    </>
                  ) : (
                    <>
                      <input className={inputClass} type="email" placeholder={locale === 'zh-CN' ? '邮箱 (测试中可随便填)' : 'Email (Can be anything during testing)'} value={form.email} onChange={(e) => updateField('email', e.target.value)} />
                      <input className={inputClass} type="password" placeholder={locale === 'zh-CN' ? '密码 (测试中可随便填)' : 'Password (Can be anything during testing)'} value={form.password} onChange={(e) => updateField('password', e.target.value)} />
                    </>
                  )}
                </div>

                <p className="text-xs text-muted-light text-right mb-4 cursor-pointer hover:text-muted transition-colors">
                  {t('forgotPassword')}
                </p>

                <button
                  className="w-full py-2.5 rounded-lg bg-foreground text-white text-sm font-medium transition-colors hover:bg-foreground/90"
                  onClick={handleLogin}
                >
                  {t('loginBtn')}
                </button>

                <p
                  className="text-center text-sm text-primary mt-4 cursor-pointer hover:underline"
                  onClick={() => setMode('register')}
                >
                  {locale === 'zh-CN' ? '没有账号？去注册' : 'No account? Register'}
                </p>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3 mb-4">
                  <input className={inputClass} placeholder={t('registerNickname')} value={form.nickname} onChange={(e) => updateField('nickname', e.target.value)} />
                  <input className={inputClass} type="email" placeholder={locale === 'zh-CN' ? '邮箱' : 'Email'} value={form.email} onChange={(e) => updateField('email', e.target.value)} />
                  <input className={inputClass} type="password" placeholder={locale === 'zh-CN' ? '密码' : 'Password'} value={form.password} onChange={(e) => updateField('password', e.target.value)} />
                  <input className={inputClass} placeholder={locale === 'zh-CN' ? '城市（选填）' : 'City (optional)'} value={form.city} onChange={(e) => updateField('city', e.target.value)} />
                  <textarea
                    className={`${inputClass} resize-y min-h-[70px] font-inherit`}
                    placeholder={locale === 'zh-CN' ? '关于我（选填）' : 'About me (optional)'}
                    value={form.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                  />
                </div>

                <button
                  className="w-full py-2.5 rounded-lg bg-foreground text-white text-sm font-medium transition-colors hover:bg-foreground/90"
                  onClick={handleRegister}
                >
                  {t('registerBtn')}
                </button>

                <p
                  className="text-center text-sm text-primary mt-4 cursor-pointer hover:underline"
                  onClick={() => setMode('login')}
                >
                  {locale === 'zh-CN' ? '已有账号？去登录' : 'Already have an account? Log in'}
                </p>
              </>
            )}

            <div className="flex gap-2 mt-6 pt-5 border-t border-border">
              <button className="flex-1 py-2.5 rounded-lg border border-border bg-surface text-xs font-medium text-foreground flex items-center justify-center gap-1.5 transition-colors hover:bg-bg">
                <MessageSquare className="w-3.5 h-3.5 text-green-600" strokeWidth={1.5} />
                WeChat
              </button>
              <button className="flex-1 py-2.5 rounded-lg border border-border bg-surface text-xs font-medium text-foreground flex items-center justify-center gap-1.5 transition-colors hover:bg-bg">
                <Mail className="w-3.5 h-3.5 text-blue-500" strokeWidth={1.5} />
                Google
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
