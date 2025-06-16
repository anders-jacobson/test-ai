import { prisma } from '../lib/prisma';
import { KeyStatus } from '@prisma/client';

async function main() {
  const profileId = '106d02e9-30c4-42dd-8dbd-bec6164c5ffa';

  // 1. Create KeyTypes
  const keyType1 = await prisma.keyType.create({
    data: {
      name: 'Main Entrance',
      accessArea: 'Lobby',
      totalCopies: 3,
      profileId: profileId,
    } as any,
  });

  const keyType2 = await prisma.keyType.create({
    data: {
      name: 'Server Room',
      accessArea: 'IT Department',
      totalCopies: 2,
      profileId: profileId,
    } as any,
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

  // 3. Create Borrowers
  const borrower1 = await prisma.borrower.create({
    data: {
      name: 'Alice Smith',
      email: 'alice@example.com',
      phone: '123-456-7890',
      company: 'Acme Corp',
      profileId: profileId,
    } as any,
  });

  const borrower2 = await prisma.borrower.create({
    data: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '987-654-3210',
      company: 'Beta LLC',
      profileId: profileId,
    } as any,
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
        profileId: profileId,
      } as any,
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
        profileId: profileId,
      } as any,
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
