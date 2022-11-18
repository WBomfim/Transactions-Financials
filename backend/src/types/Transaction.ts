import { z } from 'zod';

const transactionSchema = z.object({
  id: z.number(),
  debitedAccountId: z.number(),
  creditedAccountId: z.number(),
  value: z.number(),
  createdAt: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;
export { transactionSchema };
