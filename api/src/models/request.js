import { model, Schema } from "mongoose";

const RequestSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "subcategory",
      required: true,
    },
    description: String,
    paid: {
      type: String,
      enum: ["paid", "free"],
      required: true,
      default: "paid",
    },
    pickupLocation: { type: String, default: "" },
    dropLocation: { type: String, default: "" },
    users: { type: Schema.Types.ObjectId, ref: "users" },
    status: {
      type: String,
      enum: ["pending", "completed"],
      required: true,
      default: "pending",
    },
    acceptedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    price: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const _model = model("request", RequestSchema);

export { _model as requestmodel };
