module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Transactions', [
      {
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 10.00,
        createdAt: new Date(),
      },
      {
        debitedAccountId: 2,
        creditedAccountId: 3,
        value: 10.00,
        createdAt: new Date(),
      },
      {
        debitedAccountId: 3,
        creditedAccountId: 4,
        value: 10.00,
        createdAt: new Date(),
      },
      {
        debitedAccountId: 4,
        creditedAccountId: 1,
        value: 10.00,
        createdAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};
