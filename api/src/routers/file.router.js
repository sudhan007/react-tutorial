import fs from "fs";
import path from "path";

const TARGET_FOLDER = path.join(process.cwd());

const filesRouter = async (app) => {
  app.get(
    "/view",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            path: { type: "string" },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        let { path: filepath } = request.query;

        // if (String(filepath).includes("uploads")) {
        //   filepath = filepath.replace("uploads/", "");
        // }
        let fullPath = path.join(TARGET_FOLDER, filepath);

        console.log(fullPath);

        if (!fs.existsSync(fullPath)) {
          return reply
            .status(404)
            .send({ message: "File not found", ok: false });
        }

        const stream = fs.createReadStream(fullPath);
        const ext = path.extname(filepath).toLowerCase();
        let contentType = "application/octet-stream";

        if (ext === ".png") {
          contentType = "image/png";
        } else if (ext === ".jpg" || ext === ".jpeg") {
          contentType = "image/jpeg";
        }

        reply.header("Content-Type", contentType);
        // remove cors
        reply.header("Access-Control-Allow-Origin", "*");
        reply.header("Cross-Origin-Resource-Policy", "cross-origin");

        return reply.send(stream);
      } catch (error) {
        console.error("Error in filesRouter:", error);
        return reply.status(500).send({
          message: "Internal Server Error in filesRouter",
          error: error.message,
          ok: false,
        });
      }
    }
  );
};

export default filesRouter;
