import Link from 'next/link';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-background">
      <div className="max-w-[1140px] mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo/Brand */}
        <div className="font-bold text-lg tracking-tight text-primary">LOGO</div>
        {/* Navigation actions */}
        <div className="flex gap-2">
          <Link href="/auth/register">
            <Button variant="default">Register</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
