import { z } from 'zod';

const accountSchema = z.object({
  id: z.number(),
  balance: z.number(),
});

export type AccountAmount = {
  accountId: number,
  account: {
    balance: number,
  }
};

export type Account = z.infer<typeof accountSchema>;
export { accountSchema };
