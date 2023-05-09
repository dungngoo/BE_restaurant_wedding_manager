require("dotenv").config();
import jwt from "jsonwebtoken";

const createJWT = () => {
  let payload = { name: "Eric", username: "123456" };
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
    console.log(token);
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;
  jwt.verify(token, key, function (err, decoded) {
    if (err) {
      console.log(err);
      return data;
    }
    return decoded;
  });
};

module.exports = {
  createJWT,
};
