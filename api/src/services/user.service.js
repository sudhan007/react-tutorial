import mongoose from "mongoose";
import { UserModel } from "../models/index.js";
import { NotificationModel } from "../models/index.js";

export const UserService = {
  getUsers: async (request, reply) => {
    try {
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 10;

      const users = await UserModel.find()
        .skip((page - 1) * limit)
        .limit(limit);
      const count = await UserModel.countDocuments();

      return {
        data: users,
        ok: true,
        message: "users fetched successfully",
        count,
      };
    } catch (error) {
      console.log(error);
      return { data: [], ok: false, message: "users not found" };
    }
  },

  getSingleUser: async (id) => {
    try {
      if (!id) {
        return { data: [], ok: false, message: "user not found" };
      }
      const user = await UserModel.findById(id);
      if (!user) {
        return { data: [], ok: false, message: "user not found" };
      }

      return { data: user, ok: true, message: "user fetched successfully" };
    } catch (error) {
      console.log(error);
      return { data: [], ok: false, message: "user not found" };
    }
  },

  search: async (request, reply) => {
    try {
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 10;
      const { username: searchquery } = request.query;

      let query = {};

      if (searchquery) {
        query = {
          $or: [
            { username: { $regex: searchquery, $options: "i" } },
            { email: { $regex: searchquery, $options: "i" } },
          ],
        };
      }

      const searchResults = await UserModel.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
      const count = await UserModel.countDocuments(query);

      return {
        data: searchResults,
        ok: true,
        message: "Search results retrieved successfully",
        count,
      };
    } catch (error) {
      console.log(error);
      return { ok: false, message: error.message };
    }
  },

  updateCategory: async (id, categoryIds) => {
    try {
      const user = await UserModel.findById(id);

      if (!user) {
        return { data: [], ok: false, message: "user not found" };
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        {
          categories: categoryIds,
        },
        {
          new: true,
        }
      );

      if (!updatedUser) {
        return { data: [], ok: false, message: "user not found" };
      }

      return {
        data: updatedUser,
        ok: true,
        message: "users updated successfully",
      };
    } catch (error) {
      console.error("Error updating Categories:", error);
      return { data: [], ok: false, message: "error updating users" };
    }
  },

  myworks: async (id, searchQuery, filter) => {
    if (!id) {
      return { data: [], ok: false, message: "User not found" };
    }

    try {
      const user = await UserModel.findById(id)
        .populate({
          path: "selectedRequests",
          match: { status: "completed" },
        })
        .populate({
          path: "selectedRequests",
          populate: {
            path: "category",
          },
        })

        .populate({
          path: "selectedRequests",
          populate: {
            path: "subcategory",
          },
        })
        .populate({
          path: "selectedRequests",
          populate: {
            path: "users",
            select: "username profilePicture",
          },
        });

      if (searchQuery) {
        user.selectedRequests = user.selectedRequests.filter((request) => {
          return request.category.categoryName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        });
      }

      if (filter) {
        user.selectedRequests = user.selectedRequests.filter((request) => {
          return request.status === filter;
        });
      }

      if (!user) {
        return { data: [], ok: false, message: "User not found" };
      }

      return {
        data: user,
        ok: true,
        message: "User works retrieved successfully",
      };
    } catch (error) {
      console.error("Error in myworks service:", error);
      return { data: [], ok: false, message: "Error fetching user works" };
    }
  },

  Notification: async (request, reply) => {
    try {
      const notifications = await NotificationModel.find();
      return {
        message: "Notifications retrieved successfully",
        data: notifications,
        ok: true,
      };
    } catch (error) {
      console.error("Error in Notification service:", error);
      return { ok: false, message: "Internal Server Error" };
    }
  },

  getWalletDetails: async (id) => {
    try {
      if (!id) {
        return { data: [], ok: false, message: "User not found" };
      }

      const user = await UserModel.findById(id)
        .populate({
          path: "usedRequests",
          populate: {
            path: "category",
          },
        })
        .populate({
          path: "usedRequests",
          populate: {
            path: "subcategory",
          },
        })
        .select("usedRequests _id requestleft profilePicture username");
      if (!user) {
        return { data: [], ok: false, message: "User not found" };
      }

      return {
        data: user,
        ok: true,
        message: "User wallet details retrieved successfully",
      };
    } catch (e) {
      return { ok: false, message: e.message, data: [] };
    }
  },

  insertRequests: async (request, reply) => {
    try {
      const requestsToInsert = request.body.selectedRequests;
      const id = request.body.id;
      console.log("insertedRequests:", requestsToInsert, id);

      let insertedRequests = await UserModel.findOneAndUpdate(
        { _id: id }, // Query to find the user by ID
        { $push: { selectedRequests: requestsToInsert } }, // Use $push to add the value to the array
        { new: true } // Return the updated document
      );

      return {
        message: "Requests inserted successfully",
        data: insertedRequests,
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return { message: "Internal server error" };
    }
  },

  updateFcmToken: async (id, fcmToken) => {
    try {
      if (!id) {
        return { ok: false, message: "user not found" };
      }

      const user = await UserModel.findById(id);

      if (!user) {
        return { ok: false, message: "user not found" };
      }

      user.fcmToken = fcmToken;

      const updatedUser = await user.save();

      return {
        data: updatedUser,
        ok: true,
        message: "user updated successfully",
      };
    } catch (error) {
      console.error("Error updating user:", error);
      return { ok: false, message: "Internal Server Error" };
    }
  },

  updateRequestCount: async (request) => {
    const { id, requestCount } = request.query;

    try {
      if (!id) return { ok: false, message: "user not found" };
      const user = await UserModel.findById(id);

      if (!user) {
        return { ok: false, message: "user not found" };
      }

      user.requestleft = +user.requestleft + Number(requestCount) ;

      const updatedUser = await user.save();

      return {
        data: updatedUser,
        ok: true,
        message: "user updated successfully",
      };
    } catch (e) {
      console.log(e);
      return { ok: false, message: e.message };
    }
  },
};
