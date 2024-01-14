import { AdminAuthController } from "../controllers/index.js";
import { upload } from "../middlewares/upload.js";

export default function (app, opts, done) {
  app.post(
    "/login",
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            aadharVerified: { type: 'boolean' },
            aadharRejected: { type: 'boolean' },
          },
          required: ['aadharVerified', 'aadharRejected'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              data: { type: 'object' },
              ok: { type: 'boolean' },
              message: { type: 'string' },
            },
          },
          401: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    AdminAuthController.login
  ),
    app.post(
      "/create",
      {
        schema: {
          // body: {
          //   type: "object",
          //   properties: {
          //     phoneNumber: { type: "number" },
          //     username: { type: "string" },
          //     email: { type: "string", format: "email" },
          //     dateofbirth: { type: "string" },
          //     gender: { type: "string", enum: ["male", "female"] },
          //     occupation: { type: "string" },
          //     experience: { type: "string" },
          //     salary: { type: "number" },
          //     address: { type: "string" },
          //     hiv: { type: "string", enum: ["negative", "positive"] },
          //     bio: { type: "string" },
          //     role: { type: "string", default: "admin" },

          //   },
          //   required: [
          //     "phoneNumber",
          //     "username",
          //     "email",
          //     "dateofbirth",
          //     "gender",
          //     "occupation",
          //     "experience",
          //     "salary",
          //     "address",
          //     "hiv",
          //     "bio"
          //   ],
          // },
          response: {
            200: {
              type: "object",
              properties: {
                data: { type: "object" },
                ok: { type: "boolean" },
                message: { type: "string" },
              },
            },
          },
          400: {
            type: "object",
            properties: {
              error: { type: "string" },
              message: { type: "string" },
            },
          },
        },
        preHandler: upload.fields([
          { name: "profilePicture", maxCount: 1 },
          { name: "aadharFront", maxCount: 1 },
          { name: "aadharBack", maxCount: 1 },
        ]),
      },
      AdminAuthController.create
    );

  app.get("/getall", AdminAuthController.getall);

  app.get("/get/:id", AdminAuthController.get);

  app.put(
    "/update/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            username: { type: "string" },
            email: { type: "string", format: "email" },
            phoneNumber: { type: "string" },
            dateofbirth: { type: "string" },
            gender: { type: "string", enum: ["male", "female"] },
            occupation: { type: "string" },
            experience: { type: "string" },
            salary: { type: "string" },
            address: { type: "string" },
            hiv: { type: "string", enum: ["negative", "positive"] },
            bio: { type: "string" },
            profilePicture: {
              type: "string",
            },
            requestleft: {
              type: "number",
            }
          },
        },
      },
    },
    AdminAuthController.update
  );

  // Delete a category by ID
  app.delete("/delete/:id", AdminAuthController.delete);

  app.post(
    "/upload",
    {
      schema: {
        consumes: ["multipart/form-data"],
        body: {
          type: "object",
          properties: {
            profilePicture: { type: "string" },
          },
          required: ["profilePicture"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              data: { type: "object" },
              ok: { type: "boolean" },
              message: { type: "string" },
            },
          },
          401: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
   
    AdminAuthController.upload
  );

  app.post(
    "/aadharverifiedornot",
      {
        schema: {
          body: {
            type: "object",
            properties: {
              aadharVerified: { type: "boolean" },
              aadharRejected: { type: "boolean" },
            },
  
          },
          response: {
            200: {
              type: "object",
              properties: {
                data: { type: "object" },
                ok: { type: "boolean" },
                message: { type: "string" },
              },
            },
            401: {
              type: "object",
              properties: {
                error: { type: "string" },
              },
            },
          },
        },
      },
  AdminAuthController.aadharverfiedornot
  ),

  app.post(
    "/createtermsandprivacy",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            type: { type: "string",enum: ["terms", "privacy"] },
            content: { type: "string" },
          },
          required: ["content", "type"],
        },
    //     response: {
    //       200: {
    //         type: "object",
    //         properties: {
    //           success: { type: "boolean" },
    //           message: { type: "string" },
    //         },
    //       },
    // //       401: {
    // //         type: "object",
    // //         properties: {
    // //           success: { type: "boolean" },
    // //           message: { type: "string" },
    // //         },
    // //       },
        // },
      },
    },
    AdminAuthController.createtermsandprivacy
  ),

  app.get(
    "/gettermsandprivacy/:type",
    
    AdminAuthController.gettermsandprivacy
  ),

  app.put(
    "/edittermsandprivacy/:type",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            content: { type: "string" },
          },
        },
      },
    },
    AdminAuthController.edittermsandprivacy
  ),

  app.put("/updateRequestLeft/:id", 
  {
    schema: {
      body: {
        type: "object",
        properties: {
          requestleft: { type: "number" },
        },
        required: ["requestleft"],
      },
    },
  },
  AdminAuthController.planupdate
  );
    done();
}
