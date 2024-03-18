import mongoose from "mongoose";
import common from "../common/common.js";
// import moment from "moment-timezone";

// moment.tz.setDefault("Asia/Bangkok");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // createdAt: {
    //   type: String,
    //   default: moment().format(),
    // },
    // updatedAt: {
    //   type: String,
    //   default: moment().format(),
    // },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    this.password = await common.commonService.encrypted(this.password);
    next();
  } catch (error) {
    console.log(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
