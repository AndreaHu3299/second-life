'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="py-6 md:py-10">
      <LoginModal
        isOpen={showModal}
        onClose={() => router.push('/')}
        onLogin={(creds) => {
          login(creds);
          router.push('/my-space');
        }}
        onRegister={(details) => {
          register(details);
          router.push('/my-space');
        }}
      />
    </div>
  );
}
