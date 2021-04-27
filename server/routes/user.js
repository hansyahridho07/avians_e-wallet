const router = require("express").Router();
const { authentication } = require("../middlewares/authentication");
const UserController = require("../controllers/userController");
const { authorizeUser } = require("../middlewares/authorizeUser");

router.post("/createUser", UserController.registrasi);
router.post("/loginUser", UserController.loginUser);
router.use(authentication);
router.get('/', UserController.findOneUser)
router.get('/voucher', UserController.vouchers)
router.get("/transactionBuy/", UserController.reqSnap);
router.get("/transaction/", UserController.showTrans);
module.exports = router;
