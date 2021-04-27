"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User);
      Transaction.belongsTo(models.Voucher);
    }
  }
  Transaction.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "UserId canot be empty",
          },
        },
      },
      VoucherId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "VoucherId canot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
