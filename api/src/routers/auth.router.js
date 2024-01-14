import { upload } from "../middlewares/upload.js";
import { AuthController } from "../controllers/index.js";

export default function (app, opts, done) {
  // app.post(
  //   "/login",
  //   {
  //     schema: {
  //       body: {
  //         type: "object",
  //         properties: {
  //           username: { type: "string"},
  //           password: { type: "string"},

  //         },
  //         required: ["username", "password"],

  //       },
  //       response: {
  //         200: {
  //           type: "object",
  //           properties: {
  //             data: { type: "object" },
  //             ok: { type: "boolean" },
  //             message: { type: "string" },
  //           },
  //         },
  //         401: {
  //           type: 'object',
  //           properties: {
  //             error: { type: 'string' },
  //           },
  //         },
  //       },
  //     },
  //   },
  //   AuthController.login
  // ),

  app.post(
    "/register",
    {
      preHandler: upload.fields([
        { name: "profilePicture", maxCount: 1 },
        {
          name: "aadharFront",
          maxCount: 1,
        },
        {
          name: "aadharBack",
          maxCount: 1,
        },
      ]),
    },

    AuthController.register
  );

  // Token validation route
  app.post(
    "/validate-token",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            token: { type: "string" },
            id: { type: "string" },
          },
          required: ["token", "id"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
          401: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    AuthController.userToken
  ),
    app.post(
      "/google",
      {
        schema: {
          body: {
            type: "object",
            properties: {
              token: { type: "string" },
            },
            required: ["token"],
          },
          response: {
            200: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
            401: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
          },
        },
      },
      AuthController.google
    ),
    app.post(
      "/signout",
      {
        schema: {
          body: {
            type: "object",
            properties: {
              token: { type: "string" },
            },
            required: ["token"],
          },
          response: {
            200: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
            401: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
          },
        },
      },
      AuthController.signout
    );

  app.post(
    "/signin",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            token: { type: "string" },
          },
          required: ["token"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
          401: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    AuthController.signin
  ),
    app.post(
      "/signup",
      {
        schema: {
          body: {
            type: "object",
            properties: {
              token: { type: "string" },
            },
            required: ["token"],
          },
          response: {
            200: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
            401: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
          },
        },
      },
      AuthController.signup
    ),
    app.post(
      "/saveUserToDatabase",
      {
        schema: {
          querystring: {
            type: "object",
            properties: {
              loginType: { type: "string", enum: ["otp", "google"] },
            },
            required: ["loginType"],
          },
          body: {
            type: "object",
            properties: {
              phoneNumber: { type: "string" },
              id: { type: "string" },
              token: { type: "string" },
              photoUrl: { type: "string" },
              displayName: { type: "string" },
            },
          },
          response: {
            200: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
            401: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
          },
        },
      },
      AuthController.saveUserToDatabase
    ),
    app.post(
      "/authcheck",
      {
        schema: {
          querystring: {
            type: "object",
            properties: {
              loginType: { type: "string", enum: ["otp", "google"] },
            },
            required: ["loginType"],
          },
          body: {
            type: "object",
            properties: {
              phoneNumber: { type: "string" },
              id: { type: "string" },
              token: { type: "string" },
              photoUrl: { type: "string" },
              displayName: { type: "string" },
            },
          },
          response: {
            200: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
            401: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
          },
        },
      },
      AuthController.authcheck
    ),
    app.post("/checkUserExistance", AuthController.checkUserExistance);
  done();
}
