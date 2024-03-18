import crypto from "crypto-js";
import jwt from "jsonwebtoken";

const encrypted = async (data) => {
  try {
    const key = process.env.KEY_SECRET;

    const encrypted = crypto.AES.encrypt(data, key).toString();

    return encrypted;
  } catch (error) {
    console.log(error);
  }
};

const decrypted = async (data) => {
  try {
    const key = process.env.KEY_SECRET;

    const decrypted = crypto.AES.decrypt(data, key).toString(crypto.enc.Utf8);

    return decrypted;
  } catch (error) {
    console.log(error);
  }
};

const generateToken = async (data) => {
  try {
    let key = process.env.KEY_SECRET;
    let token = jwt.sign(data, key, { expiresIn: "30d" });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export default {
  commonService: { encrypted, decrypted, generateToken },
};
