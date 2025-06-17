'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function NavbarRoot() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>('Initializing...');
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          setDebugInfo(`Error: ${error.message}`);
          setLoggedIn(false);
        } else if (session) {
          setDebugInfo(`Logged in as: ${session.user.email}`);
          setLoggedIn(true);
        } else {
          setDebugInfo('No session found');
          setLoggedIn(false);
        }

        setIsLoading(false);
      } catch (err) {
        setDebugInfo(`Exception: ${err}`);
        setLoggedIn(false);
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setDebugInfo(`Auth change - Logged in as: ${session.user.email}`);
        setLoggedIn(true);
      } else {
        setDebugInfo('Auth change - Logged out');
        setLoggedIn(false);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Force reload to clear any cached state
    window.location.reload();
  };

  if (isLoading) {
    return (
      <nav className="w-full border-b bg-background">
        <div className="max-w-[1140px] mx-auto flex h-16 items-center justify-between px-4">
          <div className="font-bold text-lg tracking-tight text-primary">LOGO</div>
          <div className="flex gap-2">
            <div className="w-20 h-9 bg-muted animate-pulse rounded-md"></div>
            <div className="w-16 h-9 bg-muted animate-pulse rounded-md"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full border-b bg-background">
      <div className="max-w-[1140px] mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo/Brand */}
        <div className="font-bold text-lg tracking-tight text-primary">
          LOGO
          {/* Temporary debug info */}
          <div className="text-xs text-muted-foreground ml-2 inline">({debugInfo})</div>
        </div>
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
