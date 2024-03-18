import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

const auth = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  let key = process.env.KEY_SECRET;

  if (!token) {
    res.status(403);
    throw new Error("Not authorized, token is require");
  }

  try {
    let tokens = token.split(" ")[1];

    const decoded = jwt.verify(tokens, key);
    // console.log(decoded._id);

    req.user = await User.findById(decoded._id).select("-password");

    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

export default auth;
