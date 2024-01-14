import { model, Schema } from "mongoose";

const NotificationSchema = new Schema({
    userId:{ type: String},
    fcm_token:{ type: String},
    date: { type: Date, default: Date.now() },
});

const _model = model("notification", NotificationSchema);

export { _model as notificationmodel };