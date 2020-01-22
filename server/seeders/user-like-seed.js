"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "UserLike",
      [
        {
          userId: "1",
          gifId: "xT9IgG50Fb7Mi0prBC",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserLike", null, {});
  },
};