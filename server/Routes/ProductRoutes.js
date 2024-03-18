import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

const productRoutes = express.Router();

productRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

productRoutes.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const products = await Product.findById(req.params.id);
    if (products) {
      res.json(products);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default productRoutes;
