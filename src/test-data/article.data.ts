import { faker } from '@faker-js/faker';

export function generateArticleData() {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(7),
    articleBody: faker.lorem.paragraph(4),
    tags: faker.lorem.word(),
  };
}
