"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voucher.belongsToMany(models.User, { through: models.Transaction });
    }
  }
  Voucher.init(
    {
      voucher_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Voucher name canot be empty",
          },
          notNull: {
            args: true,
            msg: "Voucher name is must",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price canot be empty",
          },
          notNull: {
            args: true,
            msg: "Price is must",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Voucher",
    }
  );
  return Voucher;
};
