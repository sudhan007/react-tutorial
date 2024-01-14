import { AuthService } from "../services/index.js";

export const AuthController = {
  register: async (request, reply) => {
    try {
      const { data, ok, message } = await AuthService.register(request, reply);

      if (!ok) {
        return reply.code(401).send({
          error: message,
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
      console.error(error);
      return reply.status(500).send({
        error: error.message,
        success: false,
      });
    }
  },

  userToken: async (request, reply) => {
    try {
      const { data, ok, message } = await AuthService.userToken(request, reply);

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

  google: async (request, reply) => {
    try {
      const { data, ok, message } = await AuthService.google(request, reply);

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

  signout: async (request, reply) => {
    try {
      const { data, ok, message } = await AuthService.signout(request, reply);

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

  signup: async (request, reply) => {
    try {
      const { data, ok, message } = await AuthService.signup(request, reply);

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

  signin: async (request, reply) => {
    try {
      const { data, ok, message } = await AuthService.signin(request, reply);

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

  saveUserToDatabase: async (request, reply) => {
    try {
      const { data, ok, message } = await AuthService.saveUserToDatabase(
        request,
        reply
      );

      if (!ok) {
        return reply.code(401).send({
          error: "Internal Server Error",
          success: false,
          message,
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
        error: "Internal Server Error",
        success: false,
        message: error.message,
      });
    }
  },

  authcheck: async (request, reply) => {
    try {
      const { data, ok, message } = await AuthService.authcheck(request, reply);

      if (!ok) {
        return reply.code(401).send({
          error: "Internal Server Error",
          success: false,
          message,
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
        error: "Internal Server Error",
        success: false,
        message: error.message,
      });
    }
  },

  // dont touch for now!
  checkUserExistance: async (request, reply) => {
    try {
      const { data, ok, message } = await AuthService.checkUserExistance(
        request
      );

      if (!ok) {
        return reply.code(200).send({
          data: {},
          ok: false,
          message: "User not found",
        });
      }

      return reply.code(200).send({ data, ok: true, message });
    } catch (error) {
      console.error(error, "🐞🐞");
      return reply.status(500).send({
        error: "Internal Server Error",
        ok: false,
        message: error.message,
      });
    }
  },
};
