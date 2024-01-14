import { RequestService } from "../services/index.js";

export const RequestController = {
  create: async (request, reply) => {
    try {
      const { data, ok, message } = await RequestService.create(request, reply);

      if (!ok) {
        return reply.code(500).send({
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

  getall: async (request, reply) => {
    try {
      const { data, ok, message, count } = await RequestService.getall(
        request,
        reply
      );

      if (!ok) {
        return reply.code(500).send({
          error: message,
          ok: false,
        });
      }

      console.log(data);

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
      const { data, ok, message } = await RequestService.get(request, reply);

      if (!ok) {
        return reply.code(500).send({
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
      const { data, ok, message } = await RequestService.update(request, reply);

      if (!ok) {
        return reply.code(500).send({
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
      const { data, ok, message } = await RequestService.delete(request, reply);

      if (!ok) {
        return reply.code(500).send({
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
      const { data, ok, message, count } = await RequestService.search(
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

  filter: async (request, reply) => {
    try {
      const { data, ok, message } = await RequestService.filter(request, reply);

      if (!ok) {
        return reply.code(500).send({
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

  history: async (request, reply) => {
    try {
      const { data, ok, message } = await RequestService.history(
        request,
        reply
      );

      if (!ok) {
        return reply.code(500).send({
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

  getRequestofSingleUser: async (request, reply) => {
    try {
      const { data, ok, message } = await RequestService.getRequestofSingleUser(
        request,
        reply
      );

      if (!ok) {
        return reply.code(500).send({
          data: [],
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
        error: error.message,
        success: false,
      });
    }
  },

  getNotifications: async (request, reply) => {
    try {
      const { data, ok, message } = await RequestService.getNotifications(
        request,
        reply
      );

      if (!ok) {
        return reply.code(500).send({
          data: [],
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
        error: error.message,
        success: false,
      });
    }
  },

  getRequestDetails: async (request, reply) => {
    try {
      const { data, ok, message } = await RequestService.getRequestDetails(
        request
      );

      if (!ok) {
        return reply.code(500).send({
          data: [],
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
        error: error.message,
        success: false,
      });
    }
  },

  acceptRequest: async (request) => {
    try {
      const { data, ok, message } = await RequestService.acceptRequest(request);

      if (!ok) {
        return {
          data: [],
          message: message,
          ok: false,
        };
      }

      return {
        data,
        ok,
        message,
      };
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        error: error.message,
        success: false,
      });
    }
  },

  markAsCompleted: async (request) => {
    try {
      const { data, ok, message } = await RequestService.markAsCompleted(
        request
      );

      if (!ok) {
        return {
          data: [],
          message: message,
          ok: false,
        };
      }

      return {
        data,
        ok,
        message,
      };
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        error: error.message,
        success: false,
      });
    }
  },

  removeUserFromRequest: async (request) => {
    try {
      const { data, ok, message } = await RequestService.removeUserFromRequest(
        request
      );

      if (!ok) {
        return {
          data: [],
          message: message,
          ok: false,
        };
      }

      return {
        data,
        ok,
        message,
      };
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        error: error.message,
        success: false,
      });
    }
  },
};
