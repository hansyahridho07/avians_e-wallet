const { User, Voucher, Transaction } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const axios = require('axios')

class UserController {
  static async registrasi(req, res, next) {
    try {
      const { name, username, password } = req.body;
      const newUser = await User.create({
        name,
        username,
        password,
        role: "user",
      });
      res.status(201).json({ newUser });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (user && comparePassword(password, user.password)) {
        let payload = {
          id: user.id,
          name: user.id,
          username: user.username,
          role: user.id,
        };
        const access_token = generateToken(payload);
        res.status(200).json({ access_token });
      } else {
        throw {
          name: "customError",
          status: 401,
          message: "Invalid username/password",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async findOneUser(req, res, next) {
    try {
      const id = req.decoded.id;
      const result = await User.findByPk(id);
      let user = {
        id: result.id,
        username: result.username,
        name: result.name,
        saldo: result.saldo,
        role: result.role
      }
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async vouchers(req,res,next){
    try {
      const vouchers = await Voucher.findAll()
      res.status(200).json({vouchers})
    } catch (error) {
      next(error)
    }
  }

  static async reqSnap(req, res, next) {
    try {
      const UserId = req.decoded.id;
      const { VoucherId } = req.query;
      let getCurrentTimestamp = () => {
        return "" + Math.round(new Date().getTime() / 1000);
      };
      const voucher = await Voucher.findOne({ where: { id: VoucherId } });
      if (!voucher) {
        throw {
          name: "customError",
          status: 404,
          message: "Voucher not found",
        };
      }
      const user = await User.findByPk(UserId);

      let snapResp = await axios({
        url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Basic " +
            Buffer.from("SB-Mid-server-hrPFTY_gPDnF0eszAt22Pbpq").toString(
              "base64"
            ),
        },
        data: {
          transaction_details: {
            order_id: "order-vcr-" + getCurrentTimestamp(),
            gross_amount: voucher.price,
          },
          credit_card: {
            secure: true,
          },
          customer_details: {
            first_name: user.name,
            email: "test@midtrans.com",
            phone: "+628123456",
            billing_address: {
              first_name: "TEST",
              last_name: "MIDTRANSER",
              email: "test@midtrans.com",
              phone: "081 2233 44-55",
              address: "Sudirman",
              city: "Jakarta",
              postal_code: "12190",
              country_code: "IDN",
            }
          },
        },
      });
      let snapToken = snapResp.data.token;
      const total = voucher.price + user.saldo;
      await User.update({ saldo: total }, { where: { id: UserId } });
      await Transaction.create({ UserId, VoucherId });
      res.status(201).json({ snapToken });
    } catch (error) {
      next(error);
    }
  };

  static async showTrans(req,res,next){
    try {
      const id = req.decoded.id
      const transactions = await Transaction.findAll({where:{UserId:id}, include:Voucher, order: [['id','desc']]})
      res.status(200).json({transactions})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;
