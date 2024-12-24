import User from "../models/user.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middleware/asyncHandler.js";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("User already exists");
    return; // Ensure no further code is executed
  }

  // Hash the user's password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();

    // Generate a token and send response
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Invalid user data" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const exitingUser = await User.findOne({ email });

  console.log(exitingUser);
  if (exitingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      exitingUser.password
    );
    if (isPasswordValid) {
      createToken(res, exitingUser._id);

      res.status(201).json({
        _id: exitingUser._id,
        username: exitingUser.username,
        email: exitingUser.email,
        isAdmin: exitingUser.isAdmin,
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } else {
    res.status(401).json({
      message: "user not found ",
    });
  }
});

const logOutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", " ", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  res.status(200).json({
    message: "LogOut Succesfully",
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("User Not Found");
  }
});

const updateCurrentUserUpdate = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    const updatedUser = await user.save();
    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updated.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found in updated ");
  }
});
export {
  createUser,
  loginUser,
  logOutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserUpdate,
};
