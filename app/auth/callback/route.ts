import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

// Placeholder: In a real implementation, you would verify the Supabase session/cookie here
// and check if the user profile is complete (has cooperative name)
// If not, redirect to /auth/complete-profile
// If yes, redirect to /dashboard

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (code) {
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // No session, redirect to login
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const email = session.user.email;

  // Query User table for user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.cooperative) {
    // No user or missing cooperative, redirect to complete profile
    return NextResponse.redirect(new URL('/auth/complete-profile', req.url));
  }

  // User is complete, redirect to dashboard
  return NextResponse.redirect(new URL('/dashboard', req.url));
}
