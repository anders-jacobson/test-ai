'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function NavbarRoot() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className="w-full border-b bg-background">
      <div className="max-w-[1140px] mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo/Brand */}
        <div className="font-bold text-lg tracking-tight text-primary">LOGO</div>
        {/* Navigation actions */}
        <div className="flex gap-2">
          {loggedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="default">Dashboard</Button>
              </Link>
              <Button variant="secondary" onClick={handleLogout} type="button">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/register">
                <Button variant="default">Register</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="secondary">Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
