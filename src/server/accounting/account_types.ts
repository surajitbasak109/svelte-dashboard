import { prisma_client } from '$/server/prisma_client';
import type { AccountType } from '@prisma/client';

export type AccountTypePagination = {
  page: number;
  pages: number;
  records: AccountType[];
};

/**
 * Fetches a paginated list of account types.
 *
 * @param {number} page - The page number to fetch, starting from 1.
 * @param {number} pageSize - The number of records per page.
 * @returns {Promise<AccountTypePagination>} - A promise that resolves to a pagination object.
 *   The pagination object contains the current page number, the total number of pages,
 *   and a list of account types.
 */
export const fetch_account_types_with_pagination = async (
  page: number,
  pageSize: number
): Promise<AccountTypePagination> => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const [count, records] = await Promise.all([
    prisma_client.accountType.count(),
    prisma_client.accountType.findMany({
      skip,
      take
    })
  ]);

  return {
    page,
    pages: Math.ceil(count / pageSize),
    records
  };
};

export const fetch_account_types = async (): Promise<Omit<AccountType, 'createdAt'>[]> => {
  return await prisma_client.accountType.findMany({
    select: {
      id: true,
      name: true
    }
  });
};

/**
 * Creates a new account type with the given name.
 *
 * @throws {Error} - If an account type with the same name already exists.
 * @param {string} name - The name of the new account type.
 * @returns {Promise<AccountType>} - A promise that resolves to the newly created account type.
 */
export const create_account_type = async (name: string): Promise<AccountType> => {
  const existingAccountType = await prisma_client.accountType.findUnique({
    where: {
      name
    }
  });

  if (existingAccountType) {
    throw new Error('Account type already exists');
  }

  return await prisma_client.accountType.create({
    data: {
      name
    }
  });
};

/**
 * Updates an account type with the given name and id.
 *
 * @throws {Error} - If an account type with the same name already exists.
 * @param {number} id - The id of the account type to update.
 * @param {string} name - The new name for the account type.
 * @returns {Promise<AccountType>} - A promise that resolves to the updated account type.
 */
export const update_account_type = async (id: number, name: string): Promise<AccountType> => {
  const existingAccountType = await prisma_client.accountType.findFirst({
    where: {
      name,
      id: {
        not: id
      }
    }
  });

  if (existingAccountType) {
    throw new Error('Account type already exists in different account types');
  }

  return await prisma_client.accountType.update({
    where: {
      id
    },
    data: {
      name
    }
  });
};

export const delete_account_type = async (id: number) => {
  await prisma_client.accountType.delete({
    where: {
      id
    }
  });
};
