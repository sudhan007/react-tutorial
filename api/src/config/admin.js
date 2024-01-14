import admin from "firebase-admin";
import path from "path";

let filepath = path.join(process.cwd(), "/src/config/path");

admin.initializeApp({
  credential: admin.credential.cert(filepath + "/google-services.json"),
});

export { admin };
