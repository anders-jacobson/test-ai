'use client';

import * as React from 'react';
import { useEffect, useState } from 'react'; // Import useEffect and useState

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Input } from '@/components/ui/input';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ListFilter, PlusCircle } from 'lucide-react';

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
}

export function DataTable<TData>({ columns }: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [data, setData] = useState([]); // Add useState for data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data);
        console.log('Data fetched', data);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // Handle filtering by name
  const handleNameFilter = (value: string) => {
    table.getColumn('borrowerName')?.setFilterValue(value);
  };

  // Handle filtering by status
  const handleStatusFilter = (status: string) => {
    table.getColumn('status')?.setFilterValue(status === 'All' ? '' : status);
  };

  // Clear the status filter
  const clearStatusFilter = () => {
    table.getColumn('status')?.setFilterValue('');
  };

  // Check if the status filter is active
  const isStatusFilterActive = !!table.getColumn('status')?.getFilterValue();

  return (
    <div>
      <div className="flex items-center justify-between py-4 space-x-2 w-full">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn('borrowerName')?.getFilterValue() as string) ?? ''}
          // onChange={(event) =>
          //   table.getColumn("borrowerName")?.setFilterValue(event.target.value)
          // }
          onChange={(event) => handleNameFilter(event.target.value)}
          className="max-w-xs"
        />
        <div className="space-x-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={table.getColumn('status')?.getFilterValue() === 'in use'}
                onCheckedChange={() => handleStatusFilter('in use')}
              >
                In use
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={table.getColumn('status')?.getFilterValue() === 'returned'}
                onCheckedChange={() => handleStatusFilter('returned')}
              >
                Returned
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={table.getColumn('status')?.getFilterValue() === 'lost'}
                onCheckedChange={() => handleStatusFilter('lost')}
              >
                Lost
              </DropdownMenuCheckboxItem>

              {isStatusFilterActive && (
                <div>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem onClick={clearStatusFilter}>
                    Clear filter
                  </DropdownMenuCheckboxItem>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Issue key</span>
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4 w-full">
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{''} {table.getPageCount()}
        </span>
        <div className="flex items-center space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
