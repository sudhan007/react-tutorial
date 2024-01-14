import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import categoryRouter from "./category.router.js";
import walletRouter from "./wallet.router.js";
import subcategoryRouter from "./subcategory.router.js";
import requestRouter from "./request.router.js";
import AdminAuthRouter from "./adminauth.router.js";
import FeedbackRouter from "./feedback.route.js";
import PaymentRouter from "./payment.router.js";
import filesRouter from "./file.router.js";

import { handleAuthUser } from "../middlewares/jwt.js";
import { handleAuthAdmin } from "../middlewares/jwt.js";

export function registerRoutes(app) {
  app.register(userRouter, {
    prefix: "api/users",
    preHandler: [handleAuthUser],
  });

  app.register(authRouter, {
    prefix: "api/auth",
    preHandler: [handleAuthAdmin],
  });

  app.register(categoryRouter, {
    prefix: "api/category",
    preHandler: [handleAuthAdmin],
  });

  app.register(subcategoryRouter, {
    prefix: "api/subcategory",
    preHandler: [handleAuthAdmin],
  });

  app.register(walletRouter, {
    prefix: "api/wallet",
    preHandler: [handleAuthAdmin],
  });

  app.register(requestRouter, {
    prefix: "api/request",
    preHandler: [handleAuthUser],
  });

  app.register(AdminAuthRouter, {
    prefix: "api/adminauth",
    preHandler: [handleAuthAdmin],
  });

  app.register(FeedbackRouter, {
    prefix: "api/feedback",
    preHandler: [handleAuthUser],
  });

  app.register(PaymentRouter, {
    prefix: "api/payment",
    preHandler: [handleAuthUser],
  });

  app.register(filesRouter, {
    prefix: "api/files",
    preHandler: [handleAuthUser],
  });

  app.log.info("Routes registered");
}
