import { faker } from '@faker-js/faker';

export const randomNameSlug = () =>
  faker.person.fullName()
    .toLowerCase()
    .replace(/[\s-]/g, '_');

export const generateComment = () => faker.lorem.words(10)