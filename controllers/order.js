const orderModel = require("../models/Order");

/**
 * @description Add Order Item
 * @route GET /api/order/add-order
 * @access Private
 */
module.exports.addOrderItems = async (req, res) => {
  const { _id } = req.user;
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ errors: [{ msg: "No Order Items" }] });
  } else {
    try {
      const order = new orderModel({
        user: _id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      const createdOrder = await order.save();
      return res.status(201).json({ createdOrder });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  }
};
