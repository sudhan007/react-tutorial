import { UserService } from "../services/index.js";

export const UserController = {
  getUsers: async (request, reply) => {
    try {
      const { data, ok, message, count } = await UserService.getUsers(
        request,
        reply
      );

      if (!ok) {
        return reply.code(401).send({
          message: message,
          ok: false,
        });
      }

      return (
        reply.code(200).send({
          data,
          ok,
          message,
          count,
        }),
        console.log("count return:", count)
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  },

  getSingleUser: async (request, reply) => {
    try {
      const { id } = request.query;
      const { data, ok, message } = await UserService.getSingleUser(id);

      if (!ok) {
        return reply.code(500).send({
          message,
          ok: false,
        });
      }

      console.log(data, ok, message);

      return reply.code(200).send({
        data,
        ok,
        message,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  },

  search: async (request, reply) => {
    try {
      const { data, ok, message, count } = await UserService.search(
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

  updateCategory: async (request, reply) => {
    try {
      const { id } = request.query;
      const { categories } = request.body;
      const { data, ok, message } = await UserService.updateCategory(
        id,
        categories
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
      return reply.status(500).send({
        error: error.message,
        success: false,
      });
    }
  },

  myworks: async (request, reply) => {
    try {
      const { id, search, filter } = request.query;
      const { data, ok, message } = await UserService.myworks(
        id,
        search,
        filter
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

  notification: async (request, reply) => {
    try {
      const { userId } = request.query;
      const { data, ok, message } = await NotificationService.notification(
        userId
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

  insertRequests: async (request, reply) => {
    try {
      console.log("Before calling UserService.insertRequests");
      const { data, ok, message } = await UserService.insertRequests(
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

  getWalletDetails: async (request, reply) => {
    try {
      const { id } = request.query;
      const { data, ok, message } = await UserService.getWalletDetails(id);

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

  updateFcmToken: async (request, reply) => {
    try {
      const { id } = request.query;
      const { fcmToken } = request.body;
      const { data, ok, message } = await UserService.updateFcmToken(
        id,
        fcmToken
      );

      if (!ok) {
        return reply.code(401).send({
          message: message,
          ok: false,
          data: [],
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
        success: false,
      });
    }
  },

  updateRequestCount: async (request, reply) => {
    try {
      const { data, ok, message } = await UserService.updateRequestCount(
        request
      );

      if (!ok) {
        return reply.code(401).send({
          message: message,
          ok: false,
          data: [],
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
        success: false,
      });
    }
  },
};
