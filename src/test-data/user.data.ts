import { faker } from '@faker-js/faker';
import { UserData } from '../types/user.types';

export const generateUserData = (): UserData => {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
  };
};
