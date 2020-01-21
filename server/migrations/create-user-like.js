'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('UserLike', {
          userId: {
            type: Sequelize.INTEGER
          },
          gifId: {
            type: Sequelize.INTEGER
          }
        })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserLike');
  }
};