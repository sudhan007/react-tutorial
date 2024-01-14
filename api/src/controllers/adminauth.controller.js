import { AdminAuthService } from "../services/index.js";

export const AdminAuthController = {
  login: async (request, reply) => {
    try {
      const { ok, message, token } = await AdminAuthService.login(request,reply);
  
      if (!ok) {
        return reply.code(401).send({
          error: message,
        });
      }
  
      return reply.code(200).send({
        data: {
          token,
        },
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

  create: async (request, reply) => {
    try {
      const { data, ok, message } = await AdminAuthService.create(request, reply);
      console.log(data , 'shjvshvsvshv hjvsuvsyvuy')
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
  
getall: async (request, reply) => {
    try {
      const { data, ok, message,count} = await AdminAuthService.getall(request, reply);

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
      const { data, ok, message } = await AdminAuthService.get(request, reply);

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
      const { data, ok, message } = await AdminAuthService.update(request, reply);

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
      const { data, ok, message } = await AdminAuthService.delete(request, reply);

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

  upload: async (request, reply) => {
    try {
      const { data, ok, message } = await AdminAuthService.upload(request, reply);

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

  aadharverfiedornot: async (request, reply) => {
    try {
      const { data, ok, message } = await AdminAuthService.aadharverfiedornot(request, reply);

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
        error : error.message,
        success : false 
      });
    }
  },

  createtermsandprivacy: async (request, reply) => {
    try {
      const { data, ok, message } = await AdminAuthService.createtermsandprivacy(request, reply);
  
      console.log(data, ok, message, 'data, ok, message ');
  
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

  gettermsandprivacy: async (request, reply) => {
    try {
      const { data, ok, message } = await AdminAuthService.gettermsandprivacy(request, reply);
  
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

  edittermsandprivacy: async (request, reply) => {
    try {
      const { data, ok, message } = await AdminAuthService.edittermsandprivacy(request, reply);
  
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

  planupdate: async (request, reply) => {
    try {
      const { data, ok, message } = await AdminAuthService.planupdate(
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
  }
};