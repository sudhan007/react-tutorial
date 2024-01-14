import { UserModel } from "../models/index.js";
// import admin from '../config/path/serviceAccountKey.json';
import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import bcryptjs from "bcryptjs";

export const AuthService = {
  register: async (request, reply) => {
    try {
      const {
        phoneNumber,
        username,
        email,
        dateofbirth,
        gender,
        occupation,
        experience,
        salary,
        address,
        hiv,
        bio,
        description,
      } = request.body;

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      const {
        files: { profilePicture, aadharFront, aadharBack },
      } = request;

      const existingUserPhone = await UserModel.findOne({ phoneNumber });
      const existingUserEmail = await UserModel.findOne({ email });

      if (existingUserPhone) {
        throw new Error("User with phone number already exists");
      } else if (existingUserEmail) {
        throw new Error("User with email already exists");
      }

      const newUser = await UserModel.create({
        phoneNumber,
        username,
        email,
        dateofbirth,
        gender,
        occupation,
        experience,
        salary,
        address,
        hiv,
        bio,
        description,
        profilePicture: profilePicture[0].path,
        aadharFront: aadharFront[0].path,
        aadharBack: aadharBack[0].path,
      });

      return {
        message: "User registered successfully",
        data: newUser,
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        message: `${error.message}`,
      };
    }
  },

  userToken: async (request, reply) => {
    try {
      const token = request.headers.authorization;
      const id = request.body.id;

      if (!token || !id) {
        return { message: "Token and/or ID not provided" };
      }

      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;

      return { success: true, message: "Token is valid" };
    } catch (error) {
      console.error("Error validating user token:", error);
      return { success: false, message: "Invalid token" };
    }
  },

  signup: async (request, reply, next) => {
    const { username, email, password } = request.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    try {
      await newUser.save();

      const idToken = request.headers.authorization;

      if (!idToken) {
        return { message: "Token not provided in headers" };
      }

      const decodedToken = await admin.auth().verifyIdToken(idToken);

      const uid = decodedToken.uid;
      const email = decodedToken.email;

      console.log("Decoded Token:", decodedToken);
      return { message: "User created successfully" };
    } catch (error) {
      next(error);
    }
  },

  signin: async (request, reply, next) => {
    const { email, password } = request.body;

    try {
      const validUser = await UserModel.findOne({ email });

      if (!validUser) {
        return next(errorHandler(404, "User not found"));
      }

      const validPassword = bcryptjs.compareSync(password, validUser.password);

      if (!validPassword) {
        return next(errorHandler(401, "Wrong credentials"));
      }

      const token = jwt.sign({ id: validUser._id }, process.env.secretKey, {
        expiresIn: "1h",
      });

      const { password: hashedPassword, ...rest } = validUser._doc;

      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      reply
        .header("Authorization", `Bearer ${token}`)
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  },

  google: async (request, reply, next) => {
    try {
      const googleToken = request.headers.authorization;
      const googleUser = await verifyGoogleToken(googleToken);

      const user = await UserModel.findOne({ email: googleUser.email });

      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.secretKey);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour

        reply
          .header("Authorization", `Bearer ${token}`)
          .cookie("access_token", token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new UserModel({
          username: request.body.name || generateRandomUsername(),
          email: googleUser.email,
          password: hashedPassword,
          profilePicture: googleUser.photo,
          fcmToken: request.body.fcmToken,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.secretKey);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour

        reply
          .header("Authorization", `Bearer ${token}`)
          .cookie("access_token", token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
    const generateRandomUsername = () => {
      return Math.random().toString(36).slice(-8);
    };
  },

  signout: (request, reply) => {
    try {
      const token = request.headers.authorization;

      reply.clearCookie("access_token").status(200).send({
        success: true,
        message: "Signout success!",
      });
    } catch (error) {
      console.error("Error during signout:", error);
      return {
        success: false,
        message: "Internal Server Error",
      };
    }
  },

  // In the service
  saveUserToDatabase: async (request, reply) => {
    try {
      const { id, username, email, password } = request.body;
      const hashedPassword = await bcryptjs.hash(password, 10);
      const newUser = new UserModel({
        id,
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      return {
        success: true,
        message: "User saved successfully",
      };
    } catch (error) {
      console.error("Error during saveUserToDatabase:", error);
      return {
        success: false,
        message: "Internal Server Error",
      };
    }
  },

  authcheck: async (request, reply) => {
    try {
      const { loginType } = request.query; // Retrieve loginType from query parameters
      const { phoneNumber, id, token, photoUrl, displayName } = request.body;

      if (!loginType || !["otp", "google"].includes(loginType)) {
        // Invalid loginType
        return {
          success: false,
          message: "Invalid loginType",
        };
      }

      if (loginType === "otp") {
        // OTP login logic
        const user = await UserModel.findOne({
          phoneNumber: phoneNumber,
          id: id,
        });

        if (user && validateOTP(user.phoneNumber, token)) {
          // Authentication successful
          return {
            success: true,
            message: "Authentication successful",
          };
        } else {
          // Invalid phone number, ID, or token
          return {
            success: false,
            message: "Invalid phone number, ID, or token",
          };
        }
      } else if (loginType === "google") {
        // Google login logic
        const user = await UserModel.findOne({
          id: id,
          displayName: displayName,
          photoUrl: photoUrl,
          email: email,
        });

        if (user && verifyGoogleToken(token)) {
          // Authentication successful
          return {
            success: true,
            message: "Authentication successful",
          };
        } else {
          // Invalid Google ID or token
          return {
            success: false,
            message: "Invalid Google ID or token",
          };
        }
      }
    } catch (error) {
      console.error(error);
      return {
        error: "Internal Server Error",
        success: false,
        message: error.message,
      };
    }
  },

  checkUserExistance: async (request) => {
    try {
      const { logintype } = request.query;
      let { email, phone } = request.body;

      if (!email) email = "";
      if (!phone) phone = "";

      if (phone.toString().includes("+")) {
        phone = phone.toString().replace("+", "");
      }

      if (logintype == "google") {
        const user = await UserModel.findOne(
          { email: email },
          "email _id role"
        );

        if (user) {
          return {
            ok: true,
            message: "User found",
            data: user,
          };
        }
        return {
          data: {},
          ok: false,
          message: "User not found",
        };
      } else if (logintype == "otp") {
        if (String(phone).length == 12) {
          phone = String(phone).substring(2, String(phone).length);
        }

        console.log(phone);

        const user = await UserModel.findOne({
          phoneNumber: phone,
        });

        if (user) {
          return {
            ok: true,
            message: "User found",
            data: user,
          };
        } else {
          return {
            ok: false,
            message: "User not found",
            data: {},
          };
        }
      }
    } catch (error) {
      console.error(error, "🐞🐞🐞🐞");
      return {
        ok: false,
        data: {},
        message: error.message,
      };
    }
  },
};
