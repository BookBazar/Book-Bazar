const orderModel = require("../models/Order");
const productModel = require("../models/Product");
const printingModel = require("../models/PrintingOrder");
const userModel = require("../models/User");

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

        const seller = await productModel.findOne({
          _id: { $eq: orderItems[i].productId },
        });
        if (seller.quantity >= orderItems[i].qty) {
          seller.quantity = seller.quantity - orderItems[i].qty;
          await seller.save();
        }
      }
      return res.status(200).json(createdOrders);
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  }
};

/**
 * @description Add Printing Order Item
 * @route POST /api/order/add-printing-order
 * @access Private
 */
module.exports.addPrintingOrderItems = async (req, res) => {
  const { _id } = req.user;

  const { printingItems, shippingAddress, paymentMethod, price } = req.body;

  if (printingItems && printingItems.length === 0) {
    return res.status(400).json({ errors: [{ msg: "No Order Items" }] });
  } else {
    try {
      const createdOrder = await printingModel.create({
        user: _id,
        printingItems: printingItems[0],
        shippingAddress,
        paymentMethod,
        price,
      });

      return res.status(200).json(createdOrder);
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
  const user = await userModel.findOne({ _id: order[0].user });
  if (!order) return res.status(401).json({ msg: "Something went wrong" });
  return res.status(200).json({ order, user });
};

/**
 * @description Get Printing Order
 * @route GET /api/order/get-printing-order
 * @access Private
 */
module.exports.getPrintingOrder = async (req, res) => {
  const { id } = req.params;

  const order = await printingModel.find({ _id: { $eq: id } });
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
 * @description Approve Printing Order
 * @route PUT /api/order/approve-printing-order
 * @access Private
 */
module.exports.approvePrintingOrder = async (req, res) => {
  const { id } = req.params;
  await printingModel.updateOne(
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
  const { productId, qty } = req.body;

  await orderModel.updateOne(
    { _id: { $eq: id } },
    {
      isPending: false,
      isApproved: false,
      isCancelled: true,
      isComplete: false,
    }
  );

  const seller = await productModel.findOne({
    _id: { $eq: productId },
  });
  if (seller.quantity >= qty) {
    seller.quantity = seller.quantity + qty;
    await seller.save();
  }

  res.status(200).json({ success: true });
};

/**
 * @description Cancel Printing Order
 * @route PUT /api/order/cancel-printing-order
 * @access Private
 */
module.exports.cancelPrintingOrder = async (req, res) => {
  const { id } = req.params;
  await printingModel.updateOne(
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

/**
 * @description Complete Printing Order
 * @route PUT /api/order/complete-printing-order
 * @access Private
 */
module.exports.completePrintingOrder = async (req, res) => {
  const { id } = req.params;
  await printingModel.updateOne(
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

/**
 * @description Get user orders
 * @route GET /api/order/get-user-orders
 * @access Private
 */
module.exports.getUserOrders = async (req, res) => {
  const { _id } = req.user;
  const myOrders = await orderModel.find({ user: { $eq: _id } });
  if (!myOrders) return res.status(401).json({ msg: "Something went wrong" });
  return res.status(200).json({ myOrders });
};

/**
 * @description Get user Printing orders
 * @route GET /api/order/get-user-printing-orders
 * @access Private
 */
module.exports.getUserPrintingOrders = async (req, res) => {
  const { _id } = req.user;
  const myOrders = await printingModel.find({ user: { $eq: _id } });
  if (!myOrders) return res.status(401).json({ msg: "Something went wrong" });
  return res.status(200).json({ myOrders });
};

/**
 * @description Get user orders for specific stores
 * @route GET /api/order/get-specific-store-orders
 * @access Private
 */
module.exports.getSpecificStoreOrders = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  const myOrders = await orderModel.find({
    "orderItems.storeOwner": { $eq: id },
    user: { $eq: _id },
  });
  if (!myOrders) return res.status(401).json({ msg: "Something went wrong" });
  return res.status(200).json({ myOrders });
};

/**
 * @description Get Pringting Order Item
 * @route GET /api/order/get-printing-orders
 * @access Private
 */
module.exports.getPrintingOrders = async (req, res) => {
  const { orderType } = req.params;
  const { _id } = req.user;

  if (orderType === "pending") {
    const orders = await printingModel.find({
      "printingItems.storeOwner": { $eq: _id },
      isPending: true,
    });
    if (!orders) return res.status(401).json({ msg: "Something went wrong" });
    return res.status(200).json({ orders });
  }
  if (orderType === "approved") {
    const orders = await printingModel.find({
      "printingItems.storeOwner": { $eq: _id },
      isApproved: true,
    });
    if (!orders) return res.status(401).json({ msg: "Something went wrong" });
    return res.status(200).json({ orders });
  }
  if (orderType === "complete") {
    const orders = await printingModel.find({
      "printingItems.storeOwner": { $eq: _id },
      isComplete: true,
    });
    if (!orders) return res.status(401).json({ msg: "Something went wrong" });
    return res.status(200).json({ orders });
  }
  if (orderType === "cancelled") {
    const orders = await printingModel.find({
      "printingItems.storeOwner": { $eq: _id },
      isCancelled: true,
    });
    if (!orders) return res.status(401).json({ msg: "Something went wrong" });
    return res.status(200).json({ orders });
  }
};
