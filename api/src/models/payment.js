import { model, Schema } from "mongoose";

const PaymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  amount: {
    type: Number,
  },
  screen: {
    type: String,
  },
  paymentstatus: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

const _model = model("payment", PaymentSchema);

export { _model as paymentmodel };
