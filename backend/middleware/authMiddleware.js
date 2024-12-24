import jwt from "jsonwebtoken";
import User from "../models/user.js";
import asyncHandler from "../middleware/asyncHandler.js";

//check if user is authenticate or not
const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_secret);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authenticated! token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authentiacted no Token");
  }
});

// check user admin or not

const authenticateAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not Authenticated as a admin");
  }
};
export { authenticate, authenticateAdmin };
