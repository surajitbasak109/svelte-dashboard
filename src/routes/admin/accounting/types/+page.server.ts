import { fetch_account_types_with_pagination, type AccountTypePagination } from '$/server/accounting/account_types.js';

const pageSize = 10;

export async function load({ url }) {
  const page = +(url.searchParams.get('page') || 1);
  const accountingTypes: AccountTypePagination = await fetch_account_types_with_pagination(page, pageSize);

  return { accountingTypes };
}
