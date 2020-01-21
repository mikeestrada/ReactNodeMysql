"use strict";

const timestamp = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "UserLike",
      [
        {
          userId: "admin",
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
