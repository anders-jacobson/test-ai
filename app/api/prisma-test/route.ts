import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Create a test profile (if not exists)
    const email = 'testuser@example.com';
    let profile = await prisma.profile.upsert({
      where: { email },
      update: {},
      create: {
        email,
        cooperative: 'Test Cooperative',
        name: 'Initial Name',
      },
    });

    // 2. Read the profile
    const readProfile = await prisma.profile.findUnique({ where: { email } });

    // 3. Update the profile's name
    const updatedProfile = await prisma.profile.update({
      where: { email },
      data: { name: 'Updated Name' },
    });

    // 4. Delete the profile
    const deletedProfile = await prisma.profile.delete({ where: { email } });

    return NextResponse.json({
      success: true,
      created: profile,
      read: readProfile,
      updated: updatedProfile,
      deleted: deletedProfile,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
