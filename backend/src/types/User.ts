import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  username: z.string().min(3),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  accountId: z.number(),
});

export type User = z.infer<typeof userSchema>;
export { userSchema };
