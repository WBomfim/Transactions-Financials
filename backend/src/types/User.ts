import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  username: z.string({ required_error: 'username is required' })
    .min(3, { message: 'username must be at least 3 characters long' }),
  password: z.string({ required_error: 'password is required' })
    .min(8, { message: 'password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'password must have at least one upper case letter' })
    .regex(/[0-9]/, { message: 'password must have at least one numeric character' }),
  accountId: z.number(),
});

export type User = z.infer<typeof userSchema>;
export { userSchema };
