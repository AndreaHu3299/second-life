'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({ isOpen, onClose, message }: SuccessModalProps) {
  const locale = useLocale();

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
            className="w-full max-w-sm bg-surface rounded-t-xl md:rounded-xl p-5 pt-6 pb-8 relative md:shadow-lg"
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

            <div className="flex flex-col items-center text-center pt-4">
              <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-4">
                <Check className="w-7 h-7 text-primary" strokeWidth={2} />
              </div>
              <p className="text-foreground font-medium mb-1">
                {locale === 'zh-CN' ? '成功' : 'Success'}
              </p>
              <p className="text-sm text-muted">{message}</p>
            </div>

            <button
              className="w-full mt-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium transition-colors hover:bg-primary-dark"
              onClick={onClose}
            >
              {locale === 'zh-CN' ? '知道了' : 'Got it'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}