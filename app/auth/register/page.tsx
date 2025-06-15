'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { registerUser } from '@/app/actions/registerUser';

export default function RegisterPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setSuccess(false);
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await registerUser(formData);
      if (result?.error) {
        setMessage(result.error);
        setSuccess(false);
      } else if (result?.success) {
        setMessage('Registration successful! Please check your email to confirm your account.');
        setSuccess(true);
      }
    });
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs space-y-6">
            <span className="text-2xl font-bold mb-6 block">Register Your Account</span>
            {/* Only show Google sign up if not successful */}
            {!success && (
              <button
                type="button"
                className="google-btn w-full flex items-center justify-center gap-2 rounded-md border border-border bg-primary/90 px-4 py-2 text-primary-foreground font-medium shadow transition duration-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_993_156)">
                    <path
                      d="M19.8052 10.2309C19.8052 9.5508 19.7491 8.86727 19.629 8.19824H10.2V12.0491H15.6261C15.3982 13.2727 14.6521 14.3364 13.6011 15.0364V17.0364H16.6011C18.4011 15.3818 19.8052 13.0364 19.8052 10.2309Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M10.2 20C12.7 20 14.8011 19.1818 16.6011 17.0364L13.6011 15.0364C12.6011 15.7364 11.4011 16.1818 10.2 16.1818C7.80114 16.1818 5.80114 14.5091 5.10114 12.3273H2.00114V14.3818C3.80114 17.5091 6.80114 20 10.2 20Z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.10114 12.3273C4.80114 11.5273 4.60114 10.6909 4.60114 9.81818C4.60114 8.94545 4.80114 8.10909 5.10114 7.30909V5.25455H2.00114C1.40114 6.45455 1.00114 7.78182 1.00114 9.18182C1.00114 10.5818 1.40114 11.9091 2.00114 13.1091L5.10114 12.3273Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M10.2 3.81818C11.5011 3.81818 12.7011 4.27273 13.6011 5.12727L16.6011 2.12727C14.8011 0.218182 12.7 0 10.2 0C6.80114 0 3.80114 2.49091 2.00114 5.25455L5.10114 7.30909C5.80114 5.12727 7.80114 3.81818 10.2 3.81818Z"
                      fill="#EA4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_993_156">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Sign up with Google
              </button>
            )}
            {/* Only show divider if not successful */}
            {!success && (
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-muted" />
                <span className="text-muted-foreground text-xs">or sign up with email</span>
                <div className="h-px flex-1 bg-muted" />
              </div>
            )}
            {success ? (
              <div className="text-green-600 text-center">{message}</div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border border-border bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full rounded-md border border-border bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Choose a password"
                  />
                </div>
                <div>
                  <label htmlFor="cooperative" className="block text-sm font-medium mb-1">
                    Cooperative Name
                  </label>
                  <input
                    id="cooperative"
                    name="cooperative"
                    type="text"
                    required
                    className="block w-full rounded-md border border-border bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your cooperative's name"
                  />
                </div>
                {message && (
                  <div className={success ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>
                    {message}
                  </div>
                )}
                <button
                  type="submit"
                  className="google-btn w-full rounded-md bg-primary px-4 py-2 text-primary-foreground font-medium shadow transition duration-200"
                  disabled={isPending}
                >
                  {isPending ? 'Registering...' : 'Register'}
                </button>
              </form>
            )}
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/rasheeque-ahnaf-piash-0nodNW_qR6s-unsplash.jpg"
          alt="Image"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}
