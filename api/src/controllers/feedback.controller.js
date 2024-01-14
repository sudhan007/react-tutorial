import { FeedbackService } from "../services/index.js";

export const FeedbackController = {
  create: async (request, reply) => {
    try {
      const {
        data: newFeedback,
        ok,
        message,
        count,
      } = await FeedbackService.create(request, reply);

      if (!ok) {
        return reply.code(401).send({
          error: message,
          ok: false,
        });
      }

      return reply.code(200).send({
        data: newFeedback,
        ok,
        message,
        count,
      });
    } catch (error) {
      console.log(error);
      return reply.status(500).json({
        error: error.message,
        success: false,
      });
    }
  },

  getall: async (request, reply) => {
    try {
      const { data, ok, message } = await FeedbackService.getall(
        request,
        reply
      );

      if (!ok) {
        return reply.code(401).send({
          error: message,
          ok: false,
        });
      }

      return reply.code(200).send({
        data,
        ok,
        message,
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        error: error.message,
        success: false,
      });
    }
  },

  get: async (request, reply) => {
    try {
      const { data, ok, message } = await FeedbackService.get(request, reply);

      if (!ok) {
        return reply.code(401).send({
          error: message,
          ok: false,
        });
      }

      return reply.code(200).send({
        data,
        ok,
        message,
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        error: error.message,
        success: false,
      });
    }
  },

  update: async (request, reply) => {
    try {
      const { data, ok, message } = await FeedbackService.update(
        request,
        reply
      );

      if (!ok) {
        return reply.code(401).send({
          error: message,
          ok: false,
        });
      }

      return reply.code(200).send({
        data,
        ok,
        message,
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        error: error.message,
        success: false,
      });
    }
  },

  delete: async (request, reply) => {
    try {
      const { data, ok, message } = await FeedbackService.delete(
        request,
        reply
      );

      if (!ok) {
        return reply.code(401).send({
          error: message,
          ok: false,
        });
      }

      return reply.code(200).send({
        data,
        ok,
        message,
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        error: error.message,
        success: false,
      });
    }
  },
};
