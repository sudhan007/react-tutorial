import { CategoryController } from "../controllers/index.js";

export default function (app, opts, done) {
  // Create a new category
  app.post(
    "/create",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            
            categoryName: { type: "string" },
          },
          required: [ "categoryName"],
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
  
    CategoryController.create,
  );

  // Get all categories
  app.get("/getall", CategoryController.getall);

  // Get a specific category by ID
  app.get("/get/:id", CategoryController.get);

  // Update a category by ID
  app.put(
    "/update/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            
            categoryName: { type: "string" },
          },
        },
      },
    },
    CategoryController.update
  );

  // Delete a category by ID
  app.delete("/delete/:id", CategoryController.delete);

//search
  app.get("/search", CategoryController.search);

  done();
}





