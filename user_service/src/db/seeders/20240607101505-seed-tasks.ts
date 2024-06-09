import { QueryInterface } from 'sequelize';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const users = [];

    for (let i = 0; i < 100; i++) {
      users.push({
        id: uuidv4(),
        name: faker.person.firstName(),
        lastName: faker.helpers.arrayElement([faker.person.lastName(), null]),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('Users', {}, {});
  }
};
