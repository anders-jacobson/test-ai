import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { SiteHeader } from '@/components/dashboard/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

async function Layout({ children }: { children: React.ReactNode }) {
  // Create a Supabase client configured to use cookies
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  // If there's an authenticated user, try to get their profile data
  let cooperative: string | undefined;
  let user: { name: string; email: string } | undefined;

  if (authUser) {
    console.log('🔍 Auth user ID:', authUser.id);
    console.log('🔍 Auth user email:', authUser.email);

    try {
      // Use Prisma to find user by email (matching dashboard actions pattern)
      const profile = await prisma.user.findUnique({
        where: { email: authUser.email! },
        select: {
          cooperative: true,
          name: true,
          email: true,
        },
      });

      console.log('📊 Prisma profile query result:', profile);

      if (profile) {
        cooperative = profile.cooperative;
        user = {
          name: profile.name || '',
          email: profile.email,
        };
        console.log('✅ Set cooperative to:', cooperative);
        console.log('✅ Set user to:', user);
      } else {
        console.log('❌ No profile found in Prisma User table');
        console.log('🔍 This user may need to complete registration');
      }
    } catch (error) {
      console.log('❌ Prisma query error:', error);
    }
  } else {
    console.log('❌ No authenticated user');
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <DashboardSidebar cooperative={cooperative} user={user} />
      {/* Debug info */}
      <div style={{ display: 'none' }}>
        DEBUG: cooperative={JSON.stringify(cooperative)}, user={JSON.stringify(user)}
      </div>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default Layout;
