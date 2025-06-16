import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const IDLE_TIMEOUT = 1 * 60 * 1000; // 1 minute for testing

export default function useIdleLogout() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      router.push('/auth/login');
    };

    const resetTimer = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(logout, IDLE_TIMEOUT);
    };

    // Listen for user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('touchstart', resetTimer);

    resetTimer();

    return () => {
      if (timer.current) clearTimeout(timer.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('mousedown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, [router]);
}
