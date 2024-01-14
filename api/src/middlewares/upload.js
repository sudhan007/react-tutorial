import fastifyMulter from "fastify-multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const storage = fastifyMulter.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads";
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname,'file.originalname')
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    req.body.image = filename;
    cb(null, filename);
  },
});

export const upload = fastifyMulter({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

export const deleteFile = (fullPath) => {
  const BASE_FOLDER = "uploads/";

  if (fs.existsSync(BASE_FOLDER + fullPath)) {
    fs.unlinkSync(BASE_FOLDER + fullPath);
  }
};
