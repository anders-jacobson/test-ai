import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const PUBLIC_PATHS = ['/auth', '/api', '/'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check Supabase session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    const loginUrl = new URL('/auth/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // TODO: Add more granular route protection if needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
