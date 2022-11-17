module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'User1',
        password: 'senhaSecreta1',
        accountId: 1,
      },
      {
        username: 'User2',
        password: 'senhaSecreta2',
        accountId: 2,
      },
      {
        username: 'User3',
        password: 'senhaSecreta3',
        accountId: 3,
      },
      {
        username: 'User4',
        password: 'senhaSecreta4',
        accountId: 4,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
