import { FeedbackModel } from "../models/index.js";

export const FeedbackService = {
  // Create a new feedback
  create: async (request, reply) => {
    try {
      const{stars,feedback}=request.body
      const newFeedback = await FeedbackModel.create({
        stars,
        feedback
      });
      return { data: newFeedback, ok: true, message: "Feedback created successfully" };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

  // Get all feedbacks
  getall: async (request, reply) => {
    try {
      const page = parseInt(request.query.page) || 1;
const limit = parseInt(request.query.limit) || 10;

      const feedbacks = await FeedbackModel.find()
        
        .skip((page - 1) * limit)
        .limit(limit);
    const count = await FeedbackModel.countDocuments();
      
    return { data: feedbacks, ok: true, message: "Feedbacks retrieved successfully",count };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

  // Get a specific feedback by ID
  get: async (request, reply) => {
    try {
      const feedback = await FeedbackModel.findById(request.params.id);
      if (!feedback) {
        return { ok: false, message: "Feedback not found" };
        return;
      }
      return { data: feedback, ok: true, message: "Feedback retrieved successfully" };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

  // Update a feedback by ID
  update: async (request, reply) => {
    try {
      const updatedFeedback = await FeedbackModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );
      if (!updatedFeedback) {
        return { ok: false, message: "Feedback not found" };
        return;
      }
      return { data: updatedFeedback, ok: true, message: "Feedback updated successfully" };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

  // Delete a feedback by ID
  delete: async (request, reply) => {
    try {
      const deletedFeedback = await FeedbackModel.findByIdAndDelete(request.params.id);
      if (!deletedFeedback) {
        return { ok: false, message: "Feedback not found" };
        return;
      }
      return { data: deletedFeedback, ok: true, message: "Feedback deleted successfully" };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },
};

// Additional operations such as searching can be added similarly.
