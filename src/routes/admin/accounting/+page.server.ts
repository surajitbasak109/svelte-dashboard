import { fetch_account_types } from '$/server/accounting/account_types';
import type { AccountType } from '@prisma/client';

export type AccountTypeSelect = {
  value: number;
  text: string;
};

export const load = async (): Promise<{ accountTypeSelect: AccountTypeSelect[] }> => {
  const accountTypes: Omit<AccountType, 'createdAt'>[] = await fetch_account_types();
  const accountTypeSelect = accountTypes.map(({ id, name }) => ({ value: id, text: name }));
  return {
    accountTypeSelect
  };
};
