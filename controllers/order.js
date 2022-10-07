const orderModel = require("../models/Order");
const productModel = require("../models/Product");

/**
 * @description Add Order Item
 * @route POST /api/order/add-order
 * @access Private
 */
module.exports.addOrderItems = async (req, res) => {
  const { _id } = req.user;

  const { orderItems, shippingAddress, paymentMethod } = req.body;
  let createdOrders = [];

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ errors: [{ msg: "No Order Items" }] });
  } else {
    try {
      for (let i = 0; i < orderItems.length; i++) {
        const createdOrder = await orderModel.create({
          user: _id,
          orderItems: orderItems[i],
          shippingAddress,
          paymentMethod,
        });
        createdOrders.push(createdOrder);
      }
      return res.status(200).json(createdOrders);
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  }
};

/**
 * @description Get Order Item
 * @route GET /api/order/get-orders
 * @access Private
 */
module.exports.getOrders = async (req, res) => {
  const { orderType } = req.params;
  const { _id } = req.user;

  //Product Ids
  let productIds = [];
  const products = await productModel.find({ user: _id });
  products.forEach((e) => {
    productIds.push(e._id);
  });

  if (orderType === "pending") {
    const orders = await orderModel.find({
      "orderItems.productId": { $in: productIds },
      isPending: true,
    });
    if (!orders) return res.status(401).json({ msg: "Something went wrong" });
    return res.status(200).json({ orders });
  }
  if (orderType === "approved") {
    const orders = await orderModel.find({
      "orderItems.productId": { $in: productIds },
      isApproved: true,
    });
    if (!orders) return res.status(401).json({ msg: "Something went wrong" });
    return res.status(200).json({ orders });
  }
  if (orderType === "complete") {
    const orders = await orderModel.find({
      "orderItems.productId": { $in: productIds },
      isComplete: true,
    });
    if (!orders) return res.status(401).json({ msg: "Something went wrong" });
    return res.status(200).json({ orders });
  }
  if (orderType === "cancelled") {
    const orders = await orderModel.find({
      "orderItems.productId": { $in: productIds },
      isCancelled: true,
    });
    if (!orders) return res.status(401).json({ msg: "Something went wrong" });
    return res.status(200).json({ orders });
  }
};

/**
 * @description Get Order
 * @route GET /api/order/get-order
 * @access Private
 */
module.exports.getOrder = async (req, res) => {
  const { id } = req.params;
  const order = await orderModel.find({ _id: { $eq: id } });
  if (!order) return res.status(401).json({ msg: "Something went wrong" });
  return res.status(200).json({ order });
};

/**
 * @description Approve Order
 * @route PUT /api/order/approve-order
 * @access Private
 */
module.exports.approveOrder = async (req, res) => {
  const { id } = req.params;
  await orderModel.updateOne(
    { _id: { $eq: id } },
    {
      isPending: false,
      isApproved: true,
      isCancelled: false,
      isComplete: false,
    }
  );
  res.status(200).json({ success: true });
};

/**
 * @description Cancel Order
 * @route PUT /api/order/cancel-order
 * @access Private
 */
module.exports.cancelOrder = async (req, res) => {
  const { id } = req.params;
  await orderModel.updateOne(
    { _id: { $eq: id } },
    {
      isPending: false,
      isApproved: false,
      isCancelled: true,
      isComplete: false,
    }
  );
  res.status(200).json({ success: true });
};

/**
 * @description Complete Order
 * @route PUT /api/order/complete-order
 * @access Private
 */
module.exports.completeOrder = async (req, res) => {
  const { id } = req.params;
  await orderModel.updateOne(
    { _id: { $eq: id } },
    {
      isPending: false,
      isApproved: false,
      isCancelled: false,
      isComplete: true,
    }
  );
  res.status(200).json({ success: true });
};
