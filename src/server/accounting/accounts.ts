import type { Account } from "@prisma/client";
import { prisma_client } from "../prisma_client";

export type CreateAccount = Omit<Account, "id" | "createdAt">;

export const create_account = async ({name, description, accountTypeId, balance}: CreateAccount) => {
    if (typeof balance == 'string') {
        balance = parseFloat(balance);
    }
    return await prisma_client.account.create({
        data: {
            name,
            description,
            accountTypeId,
            balance
        }
    });
};
