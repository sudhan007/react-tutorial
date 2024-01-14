import { UserModel } from "../models/index.js";
import {PrivacyModel} from "../models/index.js";
// import bcryptjs from "bcryptjs";
// import Jwttoken from "../middlewares/jwttoken.js";
import jwt from "jsonwebtoken"; 

export const AdminAuthService = {
  login: async (request, reply) => {
    const { email, password } = request.body;

    if (email === 'admin' && password === 'admin') {
      const token = jwt.sign({ email }, jwtKey, { expiresIn: '1h' });
  
      return({ data: { token }, ok: true, message: 'Login successful', token });
    } else {
      return({ message: 'Invalid credentials' });
    }
},
 
  create: async (request, reply) => {
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
    throw new Error('Invalid email format');
  }

    // Validate phoneNumber 
    const phoneRegex = /^\d{10}$/; 
    if (!phoneRegex.test(phoneNumber)) {
      throw new Error('Invalid phone number format');
    }

        const {
          files: { profilePicture, aadharFront, aadharBack },
        } = request;
    
        const existingUser = await UserModel.findOne({ phoneNumber });
        if (existingUser) {
          return {
            error: 'Bad Request',
            message: 'Phone number is already registered',
            ok: false,
          };
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
          message: 'User registered successfully',
          data: newUser.toObject(),
          ok: true,
        };
      } catch (error) {
        console.error('Error during registration:', error);
        return {
          error: 'Internal Server Error',
          message: 'An internal server error occurred during registration',
          ok: false,
        };
      }
    },

    getall: async (request, reply) => {
      try {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;

      const user = await UserModel.find()
        
        .skip((page - 1) * limit)
        .limit(limit);
    const count = await UserModel.countDocuments();
        
    return{ data: user, ok: true, message: "User retrieved successfully",count };
      } catch (error) {
        return{ ok: false, message: "Internal Server Error" };
      }
    },
  
    // Get a specific user by ID
    get: async (request, reply) => {
      try {
        const user = await UserModel.findById(request.params.id);
        if (!user) {
          reply.status(404).send({ ok: false, message: "user not found" });
          return;
        }
        return{ data: user, ok: true, message: "user retrieved successfully" };
      } catch (error) {
        return{ ok: false, message: "Internal Server Error" };
      }
    },
  
    // Update a user by ID
    update: async (request, reply) => {
      try {
        const updatedUser = await UserModel.findByIdAndUpdate(
          request.params.id,
          request.body,
          { new: true }
        );
        if (!updatedUser) {
          return{ ok: false, message: "User not found" };
          
        }
        reply.send({ data: updatedUser, ok: true, message: "user updated successfully" });
      } catch (error) {
        return{ ok: false, message: "Internal Server Error" };
      }
    },
  
    // Delete a category by ID
    delete: async (request, reply) => {
      try {
        const deletedUser = await UserModel.findByIdAndDelete(request.params.id);
        if (!deletedUser) {
          return{ ok: false, message: "User not found" };
          
        }
        return{ data: deletedUser, ok: true, message: "User deleted successfully" };
      } catch (error) {
        return{ ok: false, message: "Internal Server Error" };
      }
    },

    upload: async (request, reply) => {
      try {
        const parts = request.files();
        
        if (Object.keys(parts).length === 0) {
          return { ok: false, message: 'No files uploaded' };
        }
  
        for await (const part of parts) {
          await pump(part.file, fs.createWriteStream(`./uploads/${part.filename}`));
        }
  
        return { ok: true, message: 'Profile picture uploaded successfully' };
      } catch (error) {
        console.error('Error in profile picture upload:', error);
        return { ok: false, message: 'Internal Server Error' };
      }
    },

    aadharverfiedornot: async (request, reply) => {
      try {
        const { id } = request.query;
        const { aadharVerified, aadharRejected } = request.body;

        const result = await UserModel.findByIdAndUpdate(
          id,
          { aadharVerified, aadharRejected },
          { new: true }
        );

        return {
          message: 'Aadahar status updated successfully',
          data: result,
          ok: true,
        };
      } catch (error) {
       
        return {
          error: 'Internal Server Error',
          message: 'An internal server error occurred during registration',
          ok: false,
        };
      }
    },
    
    authcheck:async (request,reply) => {
      try {} catch (error) {
        console.error(error);
        return { data: null, ok: false, message: error.message };
      }
    },

    createtermsandprivacy: async (request, reply) => {
      try {
        const {
          type,
          content
        } = request.body;

        const newDocument = await PrivacyModel.create({
          type,
          content
        });
    
        return {
          message: 'Document Created successfully',
          data: newDocument,
          ok: true,
        };
      } catch (error) {
       
        return {
          error: 'Internal Server Error',
          message: 'An internal server error occurred during registration',
          ok: false,
        };
      }
  },

    gettermsandprivacy: async (request, reply) => {
      try {
        const { type } = request.params;
        // Validate type here if needed
    
        const document = await PrivacyModel.findOne({ type });
        if (!document) {
          return { message: 'Document not found', ok: false };
        }
    
        return{ data: document, ok: true, message: "Document retrieved successfully" };
      } catch (err) {
        return{ error: err.message, ok: false };
      }
    },

    edittermsandprivacy: async (request, reply) => {
      try {
        const { type } = request.params;
        const { content } = request.body;
    
        const document = await PrivacyModel.findOneAndUpdate({ type }, { content }, { new: true });
        if (!document) {
          return { message: 'Document not found', ok: false };
        }
    
        return{ data: document, ok: true, message: "Document updated successfully" };
      } catch (err) {
        return{ error: err.message, ok: false };
      }
    },

    planupdate: async (request, reply) => {
      const userId = request.params.id;
      
      const { requestleft } = request.body;
      
      try {
        // Find and update the user
        const user = await UserModel.findById(userId);
    
        if (!user) {
          return { message: 'User not found' };
        }
    
        let tot = parseInt(requestleft) + parseInt(user.requestleft);
        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          { $set: { requestleft:  tot  } },
          { new: true }
        );
    
        return { data: updatedUser, message: "User updated successfully" };
      } catch (error) {
        console.error("Error updating user:", error);
        return { message: 'Internal server error' };
      }
    },
    
};
  

