import { prisma } from '../lib/prisma';
import { KeyStatus } from '@prisma/client';

async function main() {
  const userId = '106d02e9-30c4-42dd-8dbd-bec6164c5ffa';

  // 1. Create KeyTypes
  const keyType1 = await prisma.keyType.create({
    data: {
      label: 'Main Entrance',
      function: 'Lobby Access',
      accessArea: 'Lobby',
      userId: userId,
    },
  });

  const keyType2 = await prisma.keyType.create({
    data: {
      label: 'Server Room',
      function: 'IT Department Access',
      accessArea: 'IT Department',
      userId: userId,
    },
  });

  // 2. Create KeyCopies
  await prisma.keyCopy.createMany({
    data: [
      { keyTypeId: keyType1.id, copyNumber: 1, status: KeyStatus.AVAILABLE },
      { keyTypeId: keyType1.id, copyNumber: 2, status: KeyStatus.OUT },
      { keyTypeId: keyType1.id, copyNumber: 3, status: KeyStatus.LOST },
      { keyTypeId: keyType2.id, copyNumber: 1, status: KeyStatus.AVAILABLE },
      { keyTypeId: keyType2.id, copyNumber: 2, status: KeyStatus.AVAILABLE },
    ],
  });

  // 3. Create Borrowers (only if they have keys)
  const borrower1 = await prisma.borrower.create({
    data: {
      name: 'Alice Smith',
      email: 'alice@example.com',
      phone: '123-456-7890',
      company: 'Acme Corp',
      userId: userId,
    },
  });

  const borrower2 = await prisma.borrower.create({
    data: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '987-654-3210',
      company: 'Beta LLC',
      userId: userId,
    },
  });

  // 4. Create LendingRecords
  const keyCopy2 = await prisma.keyCopy.findFirst({
    where: { keyTypeId: keyType1.id, copyNumber: 2 },
  });
  const keyCopy4 = await prisma.keyCopy.findFirst({
    where: { keyTypeId: keyType2.id, copyNumber: 1 },
  });

  if (keyCopy2 && keyCopy4) {
    await prisma.lendingRecord.create({
      data: {
        keyCopyId: keyCopy2.id,
        borrowerId: borrower1.id,
        lentDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-10'),
        notes: 'Urgent access required',
        idChecked: true,
        returnedDate: null,
        userId: userId,
      },
    });

    await prisma.lendingRecord.create({
      data: {
        keyCopyId: keyCopy4.id,
        borrowerId: borrower2.id,
        lentDate: new Date('2024-06-05'),
        endDate: null,
        notes: null,
        idChecked: false,
        returnedDate: null,
        userId: userId,
      },
    });
  }

  console.log('Seed data for keys created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
