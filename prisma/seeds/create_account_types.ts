// seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function create_account_types() {
  const existingAccountTypes = await prisma.accountType.findMany();
  if (existingAccountTypes.length === 0) {
    const accountTypes = [
      { name: 'Cash' },
      { name: 'Bank' },
      { name: 'Accounts Receivable' },
      { name: 'Inventory' },
      { name: 'Equipment' },
      { name: 'Real Estate' },
      { name: 'Accounts Payable' },
      { name: 'Loans Payable' },
      { name: 'Credit Card Debt' },
      { name: 'Accrued Liabilities' },
      { name: "Owner's Equity" },
      { name: 'Retained Earnings' },
      { name: 'Sales Revenue' },
      { name: 'Service Income' },
      { name: 'Interest Income' },
      { name: 'Rent Expense' },
      { name: 'Utilities Expense' },
      { name: 'Salaries Expense' },
      { name: 'Marketing Expense' }
    ];

    await prisma.accountType.createMany({
      data: accountTypes
    });

    console.log('Account types seeded successfully!');
  } else {
    console.log('Account types already exist. No action taken.');
  }
}

export default create_account_types;
