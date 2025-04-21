const Cart = require("../models/cart-model");

const cartController = {
  createCart: async (req, res, next) => {
    const cart = req.body;
    const newCart = new Cart(cart);
    const savedCart = await newCart.save();
    return res.status(201).json(savedCart);
  },
};

module.exports = { cartController };
