const { Router } = require("express");
const { cartController } = require("../controllers/cart-controller");

const cartRouter = Router();
cartRouter.post("/", cartController.createCart);
module.exports = { cartRouter };
