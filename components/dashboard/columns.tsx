'use client';

import { ColumnDef } from '@tanstack/react-table';

import { IconArrowsUpDown, IconDots } from '@tabler/icons-react';

// Helper function to format date as "day month year"
function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define the types for the data structure
export type BorrowedKey = {
  borrowerName: string; // Name of the person
  company?: string; // Company name if applicable
  email: string; // Contact email of the borrower
  phone: string; // Optional phone number
  keyId: string; // Key ID
  keyLabel: string; // Key label (e.g., "A", "B", etc.)
  copyNumber: number; // Copy number
  borrowedAt: string; // Date when the key was borrowed
  returnedAt?: string; // Date when the key was returned (optional)
};

// Define the columns for the table
export const columns: ColumnDef<BorrowedKey>[] = [
  {
    accessorKey: 'borrowerName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 text-left"
        >
          Name
          <IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'keyLabel',
    header: 'Key',
    cell: ({ row }) => {
      const keyLabel = row.original.keyLabel;
      const copyNumber = row.original.copyNumber;
      return (
        <div>
          {keyLabel}
          {copyNumber}
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Last change',
    cell: ({ row }) => {
      // Show returned date if available, otherwise show borrowed date
      const date = row.original.returnedAt || row.original.borrowedAt;

      return <div>{formatDate(date || '')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const BorrowedKey = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconDots className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(BorrowedKey.phone)}>
              Call {BorrowedKey.phone}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Return key</DropdownMenuItem>
            <DropdownMenuItem>View key access</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
