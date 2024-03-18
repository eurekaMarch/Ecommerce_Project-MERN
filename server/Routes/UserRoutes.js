import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import common from "../common/common.js";
import auth from "../Middleware/Auth.js";

const userRoutes = express.Router();

userRoutes.post(
  "/register",
  asyncHandler(async (req, res) => {
    let data = req.body;
    let responseData = {};

    const checktUser = await User.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });

    if (checktUser === null) {
      await User.create(data);
      responseData.success = true;
      res.status(201);
    } else if (checktUser.username === data.username) {
      responseData.success = false;
      responseData.error = "User already exists";
      res.status(400);
    } else if (checktUser.email === data.email) {
      responseData.success = false;
      responseData.error = "Email already exists";
      res.status(400);
    }

    res.send(responseData);
  })
);

userRoutes.post(
  "/login",
  asyncHandler(async (req, res) => {
    const data = req.body;
    const responseData = {};

    const checktUser = await User.findOne({ email: data.email });

    if (checktUser === null) {
      responseData.success = false;
      responseData.error = "User not found";
      res.status(401);
    } else {
      const decryptedPwd = await common.commonService.decrypted(
        checktUser.password
      );

      if (decryptedPwd == data.password) {
        const tokenObj = { _id: checktUser._id };

        responseData.success = true;
        responseData.data = {
          _id: checktUser._id,
          username: checktUser.username,
          email: checktUser.email,
          createdAt: checktUser.createdAt,
        };
        responseData.token = await common.commonService.generateToken(tokenObj);
      } else {
        responseData.success = false;
        responseData.error = "Password invalid";
        res.status(401);
      }
    }

    res.send(responseData);
  })
);

userRoutes.get(
  "/profile",
  auth,
  asyncHandler(async (req, res) => {
    const responseData = {};

    const user = await User.findById(req.user._id);

    if (user) {
      responseData.data = {
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      };
    } else {
      responseData.error = "User not found";
      res.status(404);
    }

    res.send(responseData);
  })
);

userRoutes.put(
  "/profile",
  auth,
  asyncHandler(async (req, res) => {
    const data = req.body;
    const responseData = {};

    const user = await User.findById(req.user._id);

    if (user) {
      user.username = data.username || user.username;
      user.email = data.email || user.email;

      if (data.password) {
        user.password = data.password;
      }

      const updatedUser = await user.save();
      const tokenObj = { _id: updatedUser._id };

      responseData.success = true;

      responseData.data = {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
      };

      responseData.token = await common.commonService.generateToken(tokenObj);
    } else {
      responseData.error = "User not found";
      res.status(404);
    }

    res.send(responseData);
  })
);

export default userRoutes;
