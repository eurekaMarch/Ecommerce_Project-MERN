import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import auth from "../Middleware/Auth.js";

const orderRoutes = express.Router();

orderRoutes.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    let data = req.body;
    let responseData = {};

    if (data.orderItems && data.orderItems.length === 0) {
      await User.create(data);
      responseData.error = "No order items";
      res.status(400);
      return;
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems: data.orderItems,
        shippingAddress: data.shippingAddress,
        itemsPrice: data.itemsPrice,
        taxPrice: data.taxPrice,
        shippingPrice: data.shippingPrice,
        totalPrice: data.totalPrice,
      });

      const createOrder = await order.save();

      responseData.data = createOrder;
      responseData.success = true;
      res.status(201);
    }

    res.send(responseData);
  })
);

orderRoutes.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  })
);

orderRoutes.get(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const orders = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (orders) {
      res.json(orders);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

export default orderRoutes;
