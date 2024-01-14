import { UserController } from "../controllers/index.js";

export default function (app, opts, done) {
  app.get("/", UserController.getUsers),
    app.get("/get-user", UserController.getSingleUser);

  app.put(
    "/updatecategory",
    {
      schema: {
        query: {
          type: "object",
          properties: {
            id: { type: "array" },
          },
          required: ["id"],
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
        },
      },
    },

    UserController.updateCategory
  );

  app.get("/myworks", UserController.myworks);

  app.get("/notification", UserController.notification);

  app.get("/search", UserController.search);

  app.post(
    "/insert",
    {
      schema: {
        body: {
          type: "object",
        },
        response: {
          201: {
            type: "object",
            properties: {
              message: { type: "string" },
              data: { type: "array" },
            },
          },
          500: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    UserController.insertRequests
  );

  app.get("/getwalletdetails", UserController.getWalletDetails);

  app.put("/updatefcmToken", UserController.updateFcmToken);

  app.post("/updaterequestcount", UserController.updateRequestCount);

  done();
}
