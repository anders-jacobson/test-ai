export default function ConfirmedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-4">Email Confirmed!</h1>
      <p className="mb-6 text-center max-w-md">
        Your email has been successfully confirmed. You can now log in to your account and start
        using the app.
      </p>
      <a
        href="/auth/login"
        className="rounded-md bg-primary px-6 py-2 text-primary-foreground font-medium shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Go to Login
      </a>
    </div>
  );
}
