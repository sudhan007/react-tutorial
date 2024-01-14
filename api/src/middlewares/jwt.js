import jwt from "jsonwebtoken";
import { UserModel as usermodel } from "../models/index.js";
import { envConfig } from "../config/env.js";
let { jwtkey } = envConfig;

export const handleAuthUser = async (req, res, next) => {
  let {token} = req.headers["authorization"] || req.headers["x-access-token"];
  if(!token) {
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }
  try {
    const decoded = jwt.verify(token, jwtkey);
    const user = await usermodel.find({ email: decoded.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const handleAuthAdmin = async (req, res, next) => {
    let {token} = req.headers["authorization"] || req.headers["x-access-token"];
    if(!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }
    try {
      const decoded = jwt.verify(token, jwtkey);
      const user = await usermodel.find({ email: decoded.email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }

      if (user.role !== "admin") {
        return res.status(401).json({
          success: false,
          message: "You can't access this route",
        });
      }

      req.user = user;
      next();
  
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };