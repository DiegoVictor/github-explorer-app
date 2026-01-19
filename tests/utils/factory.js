import { factory } from 'factory-girl';
import { faker } from '@faker-js/faker';

factory.define(
  'User',
  {},
  {
    name: faker.person.fullName,
    login: faker.internet.username,
    bio: faker.lorem.paragraph,
    avatar_url: faker.image.url,
  },
);

factory.define(
  'Repository',
  {},
  {
    id: faker.number.int,
    name: faker.person.fullName,
    owner: {
      avatar_url: faker.image.url,
      login: faker.internet.username,
    },
  },
);

export default factory;
