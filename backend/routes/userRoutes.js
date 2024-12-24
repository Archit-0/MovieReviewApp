import express from "express";
// controller
import {
  createUser,
  loginUser,
  logOutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserUpdate,
} from "../controller/userController.js";
//middleware

import {
  authenticate,
  authenticateAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authenticateAdmin, getAllUsers);
router.route("/login").post(loginUser);
router.post("/logOut", logOutCurrentUser);
router.get("/profile", authenticate, getCurrentUserProfile);
router.put("/profile", authenticate, updateCurrentUserUpdate);

export default router;
