import { PaymentController } from "../controllers/index.js";
import { upload } from "../middlewares/upload.js";

export default function (app, opts, done) {
  // Create a new feedback
  app.post(
    "/create",
    {
      preHandler: upload.fields([{ name: "screen", maxCount: 1 }]),
    },
    PaymentController.create
  );

  app.get("/getall", PaymentController.getall);

  app.get("/get", PaymentController.get);

  app.get("/search", PaymentController.search);

  done();
}
