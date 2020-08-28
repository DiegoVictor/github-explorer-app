import { factory } from 'factory-girl';
import faker from 'faker';

factory.define(
  'User',
  {},
  {
    name: faker.name.findName,
    login: faker.internet.userName,
    bio: faker.lorem.paragraph,
    avatar_url: faker.image.imageUrl,
  }
);

factory.define(
  'Repository',
  {},
  {
    id: faker.random.number,
    name: faker.name.findName,
    owner: {
      avatar_url: faker.image.imageUrl,
      login: faker.internet.userName,
    },
  }
);

export default factory;
