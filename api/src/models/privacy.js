import { model, Schema } from "mongoose";

const privacySchema = new Schema({
    type: { type: String, enum: ["terms", "privacy"],required: true },
    content: { type: String,required: true },
  date: { type: Date, default: Date.now() },
});

const _model = model("privacy", privacySchema);

export { _model as privacymodel };