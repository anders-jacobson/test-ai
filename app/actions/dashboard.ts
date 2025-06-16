'use server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

// Server-side: Get the current user's Profile.id from Supabase Auth session (for Server Actions)
async function getCurrentProfileId() {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user?.email) throw new Error('Not authenticated');
  const profile = await prisma.profile.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!profile) throw new Error('Profile not found');
  return profile.id;
}

export async function getKeyStatusSummary() {
  const profileId = await getCurrentProfileId();
  // Get all key types for this profile (cooperative)
  // If you get a type error here, run `npx prisma generate` to update your client types.
  const keyTypes = (await prisma.keyType.findMany({
    where: { profileId },
    select: {
      id: true,
      name: true,
      keyCopies: {
        select: { status: true },
      },
    },
  })) as unknown as Array<{ id: string; name: string; keyCopies: { status: string }[] }>;

  // Aggregate counts for each status
  return keyTypes.map((kt) => {
    const counts = { Available: 0, InUse: 0, Lost: 0 };
    kt.keyCopies.forEach((copy) => {
      if (copy.status === 'AVAILABLE') counts.Available++;
      else if (copy.status === 'OUT') counts.InUse++;
      else if (copy.status === 'LOST') counts.Lost++;
    });
    return {
      keyType: kt.name,
      ...counts,
    };
  });
}

export async function getBorrowedKeysTableData() {
  const profileId = await getCurrentProfileId();
  // Get all lending records for this profile (cooperative)
  const lendingRecords = await prisma.lendingRecord.findMany({
    where: { profileId },
    include: {
      borrower: true,
      keyCopy: true,
    },
  });

  return lendingRecords.map((record) => {
    let status: 'borrowed' | 'returned' | 'lost' = 'borrowed';
    if (record.keyCopy.status === 'LOST') status = 'lost';
    else if (record.returnedDate) status = 'returned';
    return {
      borrowerName: record.borrower.name,
      company: record.borrower.company ?? '',
      email: record.borrower.email ?? '',
      phone: record.borrower.phone ?? '',
      keyId: record.keyCopyId,
      status,
      borrowedAt: record.lentDate?.toISOString() ?? '',
      returnedAt: record.returnedDate?.toISOString() ?? '',
    };
  });
}
