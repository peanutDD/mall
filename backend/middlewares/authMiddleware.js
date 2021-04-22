import JWT from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const checkUserAuthMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const result = JWT.verify(token, process.env.JWT_SECRET);
      user = User.findById(result.id).select("-password");

      if (user) {
        req.currentUser = user;
        return next();
      } else {
        res.json(401);
        throw new Error("No such user");
      }
    } catch (error) {
      res.json(401);
      throw new Error("Not authorized, Invalid/Expired token");
    }
  } else if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
