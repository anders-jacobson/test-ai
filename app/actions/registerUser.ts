'use server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import bcrypt from 'bcrypt';

export async function registerUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const cooperative = formData.get('cooperative') as string;

  if (!email || !password || !cooperative) {
    return { error: 'All fields are required.' };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' };
  }

  try {
    // Hash the password
    await bcrypt.hash(password, 10); // Not used, but kept for future extensibility

    // Create server client for authentication
    const supabase = await createClient();

    // Register user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      // If Supabase returns a user exists error, show a friendly message
      if (error.message && error.message.toLowerCase().includes('user already registered')) {
        return { error: 'A user with this email already exists.' };
      }
      return { error: error.message };
    }

    // Get the auth user ID for our database record
    const authUserId = data.user?.id;
    if (!authUserId) {
      return { error: 'Failed to get user ID from Supabase.' };
    }

    // Create user in the database with auth_id
    await prisma.user.create({
      data: {
        email,
        cooperative,
        auth_id: authUserId,
      },
    });

    return { success: true };
  } catch (err) {
    // Prisma unique constraint error
    if (
      err instanceof Error &&
      err.message &&
      err.message.toLowerCase().includes('unique constraint failed') &&
      err.message.toLowerCase().includes('email')
    ) {
      return { error: 'A user with this email already exists.' };
    }
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: 'Registration failed.' };
  }
}
