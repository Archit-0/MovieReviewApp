import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_secret, {
    expiresIn: "30d",
  });

  // set jwt as an htttp-onlt cokkie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevent access to the cookie via JavaScript
    secure: process.env.Node_ENV !== "development", // Use HTTPS in production
    sameSite: "strict", //prevent csif attack
    maxAge: 30 * 24 * 60 * 1000, // 30 days in milliseconds
  });

  return token;
};

export default generateToken;
