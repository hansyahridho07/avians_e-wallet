"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Voucher, { through: models.Transaction });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name canot be empty",
          },
          notNull: {
            args: true,
            msg: "Name is must",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username already exist",
        },
        validate: {
          notNull: {
            args: true,
            msg: "Username is must",
          },
          notEmpty: {
            args: true,
            msg: "Username canot be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password canot be empty",
          },
          notNull: {
            args: true,
            msg: "Password is must",
          },
          len: {
            args: [5],
            msg: "Password minimal 5 character",
          },
        },
      },
      saldo: DataTypes.INTEGER,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, opt) => {
          user.password = hashPassword(user.password);
          user.saldo = 0;
        },
        beforeUpdate: (user, opt) => {
          user.password = hashPassword(user.password);
        }
      },
    }
  );
  return User;
};
