import { User as UserInterface } from '../_types/user';

class User implements UserInterface {
  key: string;
  email: string;
  userName: string;

  static fromInterface(data: UserInterface): User {
    const user = new User();

    user.key = data.key;
    user.email = data.email;
    user.userName = data.userName;

    return user;
  }
}

export { User, UserInterface };
