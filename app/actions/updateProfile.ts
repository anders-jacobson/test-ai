'use server';
import { prisma } from '@/lib/prisma';

export async function updateUser({ email, cooperative }: { email: string; cooperative: string }) {
  if (!email || !cooperative) {
    return { error: 'Email and cooperative name are required.' };
  }
  try {
    await prisma.user.update({
      where: { email },
      data: { cooperative },
    });
    return { success: true };
  } catch (error: unknown) {
    let message = 'Något gick fel vid uppdatering.';
    if (error instanceof Error) message = error.message;
    return { error: message };
  }
}
