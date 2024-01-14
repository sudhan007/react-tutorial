import {SubcategoryController} from "../controllers/index.js";


export default function (app, opts, done) {
  // Create a new category
  app.post(
    "/create",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            subcategoryname: { type: "string" },
            categoryName: { type: "string" },
          },
          required: ["subcategoryname", "categoryName"],
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
    SubcategoryController.create
  );

  // Get all categories
  app.get("/getall", SubcategoryController.getall);

  // Get a specific category by ID
  app.get("/get/:id", SubcategoryController.get);

  // Update a category by ID
  app.put(
    "/update/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            subcategoryname: { type: "string" },
            categoryName: { type: "string" },
           
          },
        },
      },
    },
    SubcategoryController.update
  );

  // Delete a category by ID
  app.delete("/delete/:id", SubcategoryController.delete);

  app.get("/showselectedcategory", SubcategoryController.showall);

  app.get("/search", SubcategoryController.search);

  done();
}
