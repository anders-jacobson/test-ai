'use client';
import './globals.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setLoggedIn(!!session);
    }
    checkSession();
  }, []);

  return (
    <html lang="sv">
      <body>
        <header className="flex items-center justify-between p-4 bg-sidebar border-b border-sidebar-border">
          <Link href="/" className="font-bold text-xl">
            Nyckelhantering
          </Link>
          {loggedIn && (
            <Link href="/auth/logout" className="text-base underline">
              Logga ut
            </Link>
          )}
        </header>
        {/* App branding */}
        <div className="flex items-center gap-2 p-2 text-lg font-bold">
          <span role="img" aria-label="key">
            🔑
          </span>{' '}
          Key Management
        </div>
        {/* Dev navigation for auth pages - remove in production */}
        <nav className="flex gap-4 p-2">
          <a href="/auth/login" className="underline">
            Login
          </a>
          <a href="/auth/register" className="underline">
            Register
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
