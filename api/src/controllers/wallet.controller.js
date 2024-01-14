import { WalletService } from "../services/index.js";

export const WalletController = {
  create: async (request, reply) => {
    try {
      const { data, ok, message } = await WalletService.create(request, reply);

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
        error : error.message,
        success : false 
      });
    }
  },
  
  getall: async (request, reply) => {
    try {
      const { data, ok, message ,count} = await WalletService.getall(request, reply);

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
        error : error.message,
        success : false 
      });
    }
  },
  
  get: async (request, reply) => {
    try {
      const { data, ok, message } = await WalletService.get(request, reply);

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
        error : error.message,
        success : false 
      });
    }
  },
  
  update: async (request, reply) => {
    try {
      const { data, ok, message } = await WalletService.update(request, reply);

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
        error : error.message,
        success : false 
      });
    }
  },
  
  delete: async (request, reply) => {
    try {
      const { data, ok, message } = await WalletService.delete(request, reply);

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
        error : error.message,
        success : false 
      });
    }
  },

  createPayment: async (request, reply) => {},
};

