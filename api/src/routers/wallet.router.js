import { WalletController } from "../controllers/index.js";

export default function (app, opts, done) {
  // Create a new category
  app.post(
    "/create",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            requestcount: { type: "number" },
            amount: { type: "number" },
            plan:{ type: "string" },
            offer:{ type: "number" },
            bestseller:{ type: "boolean" },
            premium:{ type: "boolean" },
          },
          required: ["requestcount", "amount","plan"],
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
    WalletController.create
  );

  // Get all categories
  app.get("/getall", WalletController.getall);

  // Get a specific category by ID
  app.get("/get/:id", WalletController.get);

  // Update a category by ID
  app.put(
    "/update/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            requestcount: { type: "string" },
            amount: { type: "string" },
            plan:{ type: "string" },
            offer:{ type: "string" },
           
          },
        },
      },
    },
    WalletController.update
  );

  // Delete a category by ID
  app.delete("/delete/:id", WalletController.delete);


  done();
}
