import { CategoryService } from "../services/index.js";

export const CategoryController = {
  create: async (request, reply) => {
    try {
      const {
        data: newCategory,
        ok,
        message,
      } = await CategoryService.create(request, reply);

      if (!ok) {
        return reply.code(500).send({
          error: message,
          ok: false,
        });
      }

      return reply.code(200).send({
        data: newCategory,
        ok,
        message,
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
      const { data, ok, message, count } = await CategoryService.getall(
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
      const { data, ok, message } = await CategoryService.get(request, reply);

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
      const { data, ok, message } = await CategoryService.update(
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
      const { data, ok, message } = await CategoryService.delete(
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

  search: async (request, reply) => {
    try {
      const { data, ok, message,count } = await CategoryService.search(
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
        count
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
