import mongoose from "mongoose";

export const connectDB = async (fastify) => {
  const DB_URL = fastify.config.DB_URL;

  try {
    await mongoose.connect(DB_URL);
    console.log("DB connected");
  } catch (error) {
    console.log(`${error} Error in DB connection`);
    process.exit(1);
  }
};
