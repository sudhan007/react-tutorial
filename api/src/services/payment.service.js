import { PaymentModel } from "../models/index.js";

export const PaymentService = {
  // Create a new payment
  create: async (request, reply) => {
    try {
      const { userid } = request.query;
      const { amount } = request.body;
      const {
        files: { screen },
      } = request;

      const verification = await PaymentModel.create({
        userId: userid,
        amount,
        screen: screen[0].originalname,
      });

      return {
        message: "Payment Screenshot sent successfully",
        data: verification,
        ok: true,
      };
    } catch (error) {
      return {
        error: error.message,
        message: error,
        ok: false,
      };
    }
  },

  getall: async (request, reply) => {
    try {
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 10;

      const payments = await PaymentModel.find()
        .populate("userId")
        .skip((page - 1) * limit)
        .limit(limit);
      const count = await PaymentModel.countDocuments();

      return {
        data: payments,
        ok: true,
        message: "Payment verification retrieved successfully",
        count,
      };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  },

  // Get a specific category by ID
  get: async (request) => {
    try {
      const { id } = request.query;

      const payment = await PaymentModel.findById(id).populate("userId");
      if (!payment) {
        return { ok: false, message: "Payment not found" };
      }
      return {
        data: payment,
        ok: true,
        message: "Payment retrieved successfully",
      };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

  update: async (request, reply) => {
    try {
      const requestUpdated = await PaymentModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );
      if (!requestUpdated) {
        reply.status(404).send({ ok: false, message: "Payment not found" });
        return;
      }
      return {
        data: requestUpdated,
        ok: true,
        message: "Payment updated successfully",
      };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

  // Search payments by request name
  search: async (request, reply) => {
    try {
      const {
        page = 1,
        limit = 10,
        username,
        email,
        phoneNumber,
      } = request.query;

      // Create a query object based on the provided search parameters
      const queryObject = {};

      if (username) {
        queryObject["users.username"] = { $regex: new RegExp(username, "i") };
      }

      if (email) {
        queryObject["users.email"] = { $regex: new RegExp(email, "i") };
      }

      if (phoneNumber) {
        queryObject["users.phoneNumber"] = phoneNumber;
      }

      console.log("Search Query Object:", queryObject);

      const searchResults = await PaymentModel.find(queryObject)
        .populate("users")
        .skip((page - 1) * limit)
        .limit(limit);

      const count = await PaymentModel.countDocuments(queryObject);

      return {
        data: searchResults,
        ok: true,
        message: "Search results retrieved successfully",
        count,
      };
    } catch (error) {
      console.error("Error in UserController.search:", error);
      return { ok: false, message: "Internal Server Error" };
    }
  },

  // Assuming you have a user ID available in request.params.userId
  history: async (request, reply) => {
    try {
      const userId = request.params.userId; // Assuming user ID is part of the request parameters

      // Perform the search operation based on user ID
      const userPayments = await PaymentModel.find({ userId }).sort({
        date: -1,
      });

      reply.send({
        data: userPayments,
        ok: true,
        message: "Payment history retrieved successfully",
      });
    } catch (error) {
      console.error("Error in PaymentService.history:", error);
      return { ok: false, message: "Internal Server Error" };
    }
  },

  renderpage: async (request, reply) => {
    try {
      const { query } = request.query;

      const searchPayments = await PaymentModel.find({
        requestname: { $regex: new RegExp(query, "i") },
      });

      reply.send({
        data: searchPayments,
        ok: true,
        message: "Payments retrieved successfully",
      });
    } catch (error) {
      console.error("Error in PaymentService.search:", error);
      return { ok: false, message: "Internal Server Error" };
    }
  },
};
