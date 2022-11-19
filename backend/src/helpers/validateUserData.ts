import { User } from '../types/User';
import { userSchema } from '../types/User';

export const validateUserData = (userObj: User): void => {
  const userPartial = userSchema.partial({ id: true, accountId: true })
  const user = userPartial.safeParse(userObj);
  if (!user.success) throw user.error;
};
