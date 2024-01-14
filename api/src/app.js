import fastify from "fastify";
import { options as EnvOptions } from "./config/env.js";
import env from "@fastify/env";
import helmet from "@fastify/helmet";
import formbody from "@fastify/formbody";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";

import multer from "fastify-multer";

import { registerRoutes } from "./routers/index.js";

const app = fastify({
  logger: {
    silent: true,
  },
});

await app.register(cors, {
  origin: ["*", "http://localhost:3000"],
});

// apply middlewares

app.register(helmet);
app.register(formbody);
app.register(multer.contentParser);

// app.register(fastifyCookie);

app.register(fastifyCookie, {
  secret: "yourSecretKey",
  parseOptions: {},
});

// apply env
await app.register(env, EnvOptions);

// connect to db
import { connectDB } from "./config/db.js";

connectDB(app);

// apply routes

registerRoutes(app);

app.get("/", (request, reply) => {
  reply.send("App is live ");
});

export default app;
