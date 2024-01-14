import { PaymentService } from "../services/index.js";

export const PaymentController = {
  create: async (request, reply) => {
    try {
      const { data, ok, message } = await PaymentService.create(request, reply);

      if (!ok) {
        return reply.code(500).send({
          message: message,
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
        message: error.message,
        ok: false,
      });
    }
  },

  getall: async (request, reply) => {
    try {
      const { data, ok, message, count } = await PaymentService.getall(
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
        count,
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
      const { data, ok, message } = await PaymentService.get(request, reply);

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

  search: async (request, reply) => {
    try {
      const { data, ok, message, count } = await PaymentService.search(
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
        count,
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
