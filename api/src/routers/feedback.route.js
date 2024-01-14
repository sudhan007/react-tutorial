import { FeedbackController } from "../controllers/index.js";

export default function (app, opts, done) {
  // Create a new feedback
  app.post(
    "/create",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            stars: { type: "number", minimum: 1, maximum: 5 },
            feedbackText: { type: "string" },
          },
          required: ["stars", "feedbackText"],
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
    FeedbackController.create
  );

  // Get all feedbacks
  app.get("/getall", FeedbackController.getall);

  // Get feedback by ID
  app.get("/get/:id", FeedbackController.get);

  // Update feedback by ID
  app.put(
    "/update/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            stars: { type: "number", minimum: 1, maximum: 5 },
            feedbackText: { type: "string" },
          },
        },
      },
    },
    FeedbackController.update
  );

  // Delete feedback by ID
  app.delete("/delete/:id", FeedbackController.delete);

  done();
}


