'use strict';
module.exports = (sequelize, DataTypes) => {
  let UserLike = sequelize.define('UserLike', {
    userId: DataTypes.STRING,
    gifId: DataTypes.STRING
  }, {
    tableName: 'UserLike',
    timestamps: false
  });
  UserLike.associate = function(models) {};
  return UserLike;
};