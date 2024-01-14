import { RequestController } from "../controllers/index.js";

export default function (app, opts, done) {
  // Create a new category
  app.post(
    "/create",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            description: { type: "string" },
            paid: { type: "string", enum: ["paid", "free"], default: "paid" },
            category: { type: "string" },
            subcategory: { type: "string" },
          },
          required: ["paid"],
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
    RequestController.create
  );

  // Get all categories
  app.get("/getall", RequestController.getall);

  // Get a specific category by ID
  app.get("/get/:id", RequestController.get);

  // Update a category by ID
  app.put(
    "/update/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            description: { type: "string" },
            paid: { type: "string" },
            categoryName: { type: "string" },
            subcategoryname: { type: "string" },
          },
        },
      },
    },
    RequestController.update
  );

  // Delete a category by ID
  app.delete("/delete/:id", RequestController.delete);

  //search
  app.get("/search", RequestController.search);

  app.get("/history", RequestController.history);

  app.get("/filter", RequestController.filter);

  app.get("/getsingleuser", RequestController.getRequestofSingleUser);

  app.get("/notifications", RequestController.getNotifications);

  app.get("/getrequestdetails", RequestController.getRequestDetails);

  app.post("/acceptrequest", RequestController.acceptRequest);

  app.post("/markascompleted", RequestController.markAsCompleted);

  app.post("/removeuserfromrequest", RequestController.removeUserFromRequest);

  done();
}
