import { admin } from "../config/admin.js";
import { RequestModel, UserModel } from "../models/index.js";
import { requestmodel } from "../models/request.js";
import { usermodel } from "../models/users.js";

export const RequestService = {
  // Create a new category
  create: async (request, reply) => {
    try {
      const {
        category,
        subcategory,
        description,
        pickupLocation,
        dropLocation,
        paid,
        price,
        date,
        user,
      } = request.body;

      const dateParts = date.split("-");
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const year = parseInt(dateParts[2], 10);

      const _user = await UserModel.findById(user);

      if (!_user) {
        return {
          ok: false,
          message: "User not found",
          data: [],
        };
      }

      if (user.requestleft == 0) {
        return {
          ok: false,
          data: [],
          message: "Request limit reached! Buy more requests!",
        };
      }

      const formattedDate = new Date(year, month, day);
      const newRequest = await RequestModel.create({
        category,
        subcategory,
        description,
        pickupLocation,
        dropLocation,
        paid,
        price: price || 0,
        date: formattedDate,
        users: user,
      });

      if (!_user.usedRequests) {
        _user.usedRequests = [];
      }
      _user.usedRequests.push(newRequest._id);
      _user.requestleft = _user.requestleft - 1;
      await _user.save();

      return {
        data: newRequest,
        ok: true,
        message: "Request created successfully",
      };
    } catch (error) {
      console.error(error);
      return { ok: false, message: error.message };
    }
  },

  // Get all categories
  getall: async (request, reply) => {
    try {
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 10;

      const showrequest = await RequestModel.find({})
        .populate("users")
        .populate("category")
        .populate("subcategory")
        .sort({ createdAt: -1 })

        .skip((page - 1) * limit)
        .limit(limit);
      const count = await RequestModel.countDocuments();

      return {
        data: showrequest,
        ok: true,
        message: "Request retrieved successfully",
        count,
      };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  },

  // Get a specific category by ID
  get: async (request, reply) => {
    try {
      const retriverequest = await RequestModel.findById(request.params.id);
      if (!retriverequest) {
        reply.status(404).send({ ok: false, message: "Request not found" });
        return;
      }
      return {
        data: retriverequest,
        ok: true,
        message: "Request retrieved successfully",
      };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

  // Update a category by ID
  update: async (request, reply) => {
    try {
      const { id } = request.params;
      const { rating, feedback, ...updateData } = request.body;

      // Validate and update rating and feedback
      if (rating !== undefined && (rating < 1 || rating > 5)) {
        return { ok: false, message: "Invalid rating value" };
      }

      const updatedRequest = await RequestModel.findByIdAndUpdate(
        id,
        { ...updateData, rating, feedback },
        { new: true }
      );
      if (!updatedRequest) {
        return { ok: false, message: "Request not found" };
      }
      return {
        data: updatedRequest,
        ok: true,
        message: "Request updated successfully",
      };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

  // Delete a category by ID
  delete: async (request, reply) => {
    try {
      const deletedRequest = await RequestModel.findByIdAndDelete(
        request.params.id
      );
      if (!deletedRequest) {
        return { ok: false, message: "Request not found" };
        return;
      }
      return {
        data: deletedRequest,
        ok: true,
        message: "Request deleted successfully",
      };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

  //   search category
  search: async (request, reply) => {
    try {
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 10;
      const { category } = request.query;

      // Create a query object based on the provided query
      const queryObject = {
        $or: [
          { "category.categoryName": { $regex: new RegExp(category, "i") } },
          {
            "subcategory.subcategoryname": {
              $regex: new RegExp(category, "i"),
            },
          },
          // Add other fields if needed
        ],
      };

      console.log("Search Query Object:", queryObject);

      const searchResults = await RequestModel.populate("users")
        .populate("category")
        .find(queryObject)
        .skip((page - 1) * limit)
        .limit(limit);

      const count = await RequestModel.countDocuments(queryObject);

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
  history: async (request, reply) => {
    try {
      const userId = request.params.userId; // Assuming user ID is part of the request parameters

      // Perform the search operation based on user ID
      const requestHistory = await RequestModel.find({ userId }).sort({
        date: -1,
      });

      return {
        data: requestHistory,
        ok: true,
        message: "Request history retrieved successfully",
      };
    } catch (error) {
      console.error("Error in RequestController.history:", error);
      return { ok: false, message: "Internal Server Error" };
    }
  },

  filter: async (request, reply) => {
    try {
      const { minimumPrice, maximumPrice, categoryName, page, limit } =
        request.query;

      // Parse and validate numeric values
      const parsedMinPrice = parseFloat(minimumPrice);
      const parsedMaxPrice = parseFloat(maximumPrice);
      const parsedPage = parseInt(page) || 1;
      const parsedLimit = parseInt(limit) || 10;

      if (
        isNaN(parsedMinPrice) ||
        isNaN(parsedMaxPrice) ||
        isNaN(parsedPage) ||
        isNaN(parsedLimit)
      ) {
        return reply
          .code(400)
          .send({ ok: false, message: "Invalid filter parameters" });
      }

      // Define filter criteria
      const filterCriteria = {};

      if (!isNaN(parsedMinPrice)) {
        filterCriteria.minimumPrice = { $gte: parsedMinPrice };
      }

      if (!isNaN(parsedMaxPrice)) {
        filterCriteria.maximumPrice = { $lte: parsedMaxPrice };
      }

      if (categoryName) {
        filterCriteria.categoryName = categoryName;
      }

      // Calculate the number of documents to skip
      const skip = (parsedPage - 1) * parsedLimit;

      // Apply filter criteria to the MongoDB query
      const filteredRequests = await RequestModel.find(filterCriteria)
        .skip(skip)
        .limit(parsedLimit);

      return {
        data: filteredRequests,
        ok: true,
        message: "Filtered requests retrieved successfully",
      };
    } catch (error) {
      console.error("Error in RequestController.filter:", error);
      return { ok: false, message: "Internal Server Error" };
    }
  },

  getRequestofSingleUser: async (request) => {
    const { id, search, filter } = request.query;

    if (!id) {
      return { ok: false, data: [], message: "User ID is required" };
    }

    let query = {
      $and: [
        {
          users: id,
        },
        filter ? { status: filter } : {},
      ],
    };

    try {
      const requests = await RequestModel.find(query)
        .populate("users")
        .populate("category")
        .populate("subcategory")
        .sort({ date: -1 });

      if (search) {
        const searchResults = requests.filter((request) =>
          request.category.categoryName
            .toLowerCase()
            .includes(search.toLowerCase())
        );
        return {
          data: searchResults,
          ok: true,
          message: "Request retrieved successfully",
        };
      }

      return {
        data: requests,
        ok: true,
        message: "Request retrieved successfully",
      };
    } catch (error) {
      console.error(
        "Error in RequestController.getRequestofSingleUser:",
        error
      );
      return { ok: false, message: "Internal Server Error" };
    }
  },

  getNotifications: async (request) => {
    let { id, page, limit } = request.query;

    try {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      let user = await UserModel.findById(id);

      if (!user) {
        return { ok: false, message: "User not found" };
      }

      // let alreadyAccepted = user.selectedRequests;

      const requests = await RequestModel.find({
        users: { $ne: id },
        status: "pending",
      })
        .populate({
          path: "users",
          select: "username phoneNumber address email bio profilePicture",
        })
        .populate({
          path: "category",
          select: "categoryName",
        })
        .populate({
          path: "subcategory",
          select: "subcategoryname",
        })
        .select(
          "-__v -createdAt -updatedAt -acceptedBy -status -pickupLocation -dropLocation"
        )
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      return {
        data: requests,
        ok: true,
        message: "Request retrieved successfully",
      };
    } catch (error) {
      console.error(
        "Error in RequestController.getRequestofSingleUser:",
        error
      );
      return { ok: false, message: "Internal Server Error" };
    }
  },

  getRequestDetails: async (request) => {
    const { id } = request.query;

    if (!id) {
      return { ok: false, data: [], message: "Request ID is required" };
    }

    try {
      let requests = await requestmodel
        .findById(id)
        .populate({
          path: "acceptedBy",
          select:
            "profilePicture experience ratings onlinestatus username aadharVerified",
        })
        .populate({
          path: "users",
          select: "username profilePicture",
        })
        .populate("category")
        .populate("subcategory");

      if (!requests) {
        return { ok: false, data: [], message: "Request not found" };
      }

      return {
        ok: true,
        data: requests,
        message: "Request details retrieved successfully",
      };
    } catch (e) {
      return {
        ok: false,
        message: e.message,
        data: [],
      };
    }
  },
  acceptRequest: async (request) => {
    const { id, reqid } = request.query;

    if (!id) {
      return { ok: false, data: [], message: "Request ID is required" };
    }

    try {
      const user = await usermodel.findById(id);
      const req = await requestmodel.findById(reqid);
      const targetUser = await usermodel.findById(req.users);

      if (!req.acceptedBy.includes(id)) {
        req.acceptedBy.push(id);
        await req.save();
      }

      if (!user.selectedRequests.includes(reqid)) {
        user.selectedRequests.push(reqid);
        await user.save();
      }

      if (targetUser.fcmToken != null) {
        await admin
          .messaging()
          .send({
            token: targetUser.fcmToken,
            data: {
              title: "Request Accepted",
              body: `Your request has been accepted by ${user.username}`,
            },
            notification: {
              title: "Request Accepted",
              body: `Your request has been accepted by ${user.username}`,
            },
          })
          .then((response) => {
            // Response is a message ID string.
            console.log("Successfully sent message:", response);
          })
          .catch(async (error) => {
            if (error == "messaging/registration-token-not-registered") {
              targetUser.fcmToken = null;

              console.log("Token not found: ", targetUser.fcmToken);

              await targetUser.save();
            }
          });
      }

      return { ok: true, data: [], message: "Request Updated" };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        message: e.message,
        data: [],
      };
    }
  },
  markAsCompleted: async (request) => {
    const { reqid } = request.query;

    try {
      if (!reqid) {
        return { ok: false, data: [], message: "Request ID is required" };
      }

      const req = await requestmodel.findById(reqid);

      if (!req) {
        return { ok: false, data: [], message: "Request not found" };
      }

      req.status = "completed";

      await req.save();

      return { ok: true, data: [], message: "Request Updated" };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        message: e.message,
        data: [],
      };
    }
  },

  removeUserFromRequest: async (request) => {
    const { id, reqid } = request.query;

    if (!id || !reqid) {
      return {
        ok: false,
        data: [],
        message: "User ID or Request ID is required",
      };
    }

    try {
      const user = await usermodel.findById(id);
      const req = await requestmodel.findById(reqid);

      if (!req) {
        return { ok: false, data: [], message: "Request not found" };
      }

      if (!user) {
        return { ok: false, data: [], message: "User not found" };
      }

      if (!req.acceptedBy.includes(id)) {
        return { ok: false, data: [], message: "User not found in request" };
      }

      req.acceptedBy = req.acceptedBy.filter((acc) => acc.toString() !== id);
      user.selectedRequests = user.selectedRequests.filter(
        (req) => req.toString() !== reqid
      );
      await req.save();
      await user.save();

      return { ok: true, data: [], message: "User removed from request" };
    } catch (e) {
      return {
        ok: false,
        message: e.message,
        data: [],
      };
    }
  },
};
