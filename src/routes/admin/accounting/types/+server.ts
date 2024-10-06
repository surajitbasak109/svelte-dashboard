import { create_account_type, delete_account_type, update_account_type } from '$/server/accounting/account_types';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.json();
  const name = form.name as string;

  if (!name) {
    return json({ message: "'Name' is required" }, { status: 400 });
  }

  let accountType = null;

  try {
    accountType = await create_account_type(name);
  } catch (e) {
    console.error(e);
    return json({ message: e }, { status: 400 });
  }

  return json({ message: 'Account type created', data: accountType });
};

export const PUT: RequestHandler = async ({ request }) => {
  const form = await request.json();
  const id = form.id as number;
  const name = form.name as string;

  if (!id) {
    return json({ message: "'Id' is required" }, { status: 400 });
  }

  if (!name) {
    return json({ message: "'Name' is required" }, { status: 400 });
  }

  let accountType = null;

  try {
    accountType = await update_account_type(id, name);
  } catch (e) {
    console.error(e);
    return json({ message: String(e) }, { status: 400 });
  }

  return json({ message: 'Account type updated', data: accountType });
};

export const DELETE: RequestHandler = async ({ request }) => {
  const form = await request.json();
  const id = form.id as number;

  if (!id) {
    return json({ message: "'Id' is required" }, { status: 400 });
  }

  try {
    await delete_account_type(id);
  } catch (e) {
      console.error(e);
      return json({ message: "Unable to delete account type, please try again" }, { status: 500 });
  }

  return json({ message: 'Account type deleted' });
};
