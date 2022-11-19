import { z } from 'zod';

const transactionSchema = z.object({
  id: z.number(),
  debitedAccountId: z.number(),
  creditedAccountId: z.number(),
  value: z.number(),
  createdAt: z.date(),
});

export type TransactionRequest = {
	usernameCredited: string,
  value: number,
}

export type Transaction = z.infer<typeof transactionSchema>;
export { transactionSchema };
