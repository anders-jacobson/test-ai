'use server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function updateUser({ email, cooperative }: { email: string; cooperative: string }) {
  if (!email || !cooperative) {
    return { error: 'Email and cooperative name are required.' };
  }

  try {
    // Get the current authenticated user from Supabase
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: 'Not authenticated.' };
    }

    // Update user profile and ensure auth_id is populated
    await prisma.user.update({
      where: { email },
      data: {
        cooperative,
        auth_id: user.id, // Ensure auth_id is set for OAuth users
      },
    });

    return { success: true };
  } catch (error: unknown) {
    let message = 'Något gick fel vid uppdatering.';
    if (error instanceof Error) message = error.message;
    return { error: message };
  }
}
