"use strict";

const timestamp = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "UserLike",
      [
        {
          userId: "1",
          gifId: "xT9IgG50Fb7Mi0prBC",
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserLike", null, {});
  },
};
