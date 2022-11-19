module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'User1',
        password: '$2a$10$NZtEM5/79ryIdkW8ENCbpO5I6HEAmcsRJKLT/BHrRUsQQCGr2BMc6',
        accountId: 1,
        //senha: 'senhaSecreta1',
      },
      {
        username: 'User2',
        password: '$2a$10$j6R39IyiDlwwI2DaEd4FyuvxH2Y/OM50PT4btxiZZ/2xkpohPZN6C',
        accountId: 2,
        //senha: 'senhaSecreta2',
      },
      {
        username: 'User3',
        password: '$2a$10$xit6VN1B/rxQKxoPfSuvq.5fiMNGD7YBCL75DtztYMDeQB7SULWAq',
        accountId: 3,
        //senha: 'senhaSecreta3',
      },
      {
        username: 'User4',
        password: '$2a$10$cqidSrBU65NE5Swm0iT1we75R0ahpCskeInNu6blVUD44XHYKrqYG',
        accountId: 4,
        //senha: 'senhaSecreta4',
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
