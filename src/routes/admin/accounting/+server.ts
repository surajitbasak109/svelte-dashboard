import { create_account, type CreateAccount } from '$/server/accounting/accounts';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const data: CreateAccount = await request.json();

  console.log(data);

  const errors = [];

  if (!data.name) {
    errors.push({
      field: 'name',
      message: 'Name is required'
    });
  }

  if (!data.accountTypeId) {
    errors.push({
      field: 'typeId',
      message: 'Type is required'
    });
  }

  if (isNaN(data.accountTypeId)) {
    errors.push({
      field: 'typeId',
      message: 'Type must be a number'
    });
  }

  if (isNaN(data.balance)) {
    errors.push({
      field: 'balance',
      message: 'Balance must be a number'
    });
  }

  if (data.balance < 0) {
    errors.push({
      field: 'balance',
      message: 'Balance cannot be negative'
    });
  }

  if (errors.length > 0) {
    return json({ errors }, { status: 400 });
  }

  let account = null;

  try {
    account = await create_account(data);
  } catch (e) {
    console.error(e);
    return json({ message: String(e) }, { status: 400 });
  }

  return json({ message: 'Account created', data: account });
};
