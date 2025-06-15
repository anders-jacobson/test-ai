'use client';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function LogoutPage() {
  useEffect(() => {
    async function signOut() {
      await supabase.auth.signOut();
      window.location.href = '/auth/login';
    }
    signOut();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-8 text-center">
        <span className="text-lg">Loggar ut...</span>
      </div>
    </main>
  );
}
