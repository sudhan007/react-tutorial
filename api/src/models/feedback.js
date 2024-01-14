import { model, Schema } from "mongoose";

const FeedbackSchema = new Schema({
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    feedback: String,
    date: {
        type: Date,
        default: Date.now(),
    },
});

const _model = model("feedback", FeedbackSchema);

export { _model as feedbackmodel };