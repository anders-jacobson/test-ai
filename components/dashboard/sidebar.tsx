import React from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Keys', href: '/keys' },
  { name: 'Borrowers', href: '/borrowers' },
];

export default function DashboardSidebar() {
  return (
    <nav className="h-full flex flex-col gap-2 p-4" aria-label="Sidebar">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="rounded px-3 py-2 text-base font-medium hover:bg-gray-200 focus:bg-gray-300 focus:outline-none"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
