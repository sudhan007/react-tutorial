import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  dateofbirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  phoneNumber: {
    type: Number,
  },
  occupation: {
    type: String,
  },
  experience: {
    type: String,
  },
  salary: {
    type: Number,
  },
  address: {
    type: String,
  },
  hiv: {
    type: String,
    enum: ["negative", "positive"],
  },
  bio: {
    type: String,
  },
  admin: {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  },
  profilePicture: {
    type: String,
  },

  aadharFront: {
    type: String,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  selectedRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "request",
    },
  ],
  usedRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "request",
    },
  ],
  aadharBack: {
    type: String,
  },
  aadharVerified: {
    type: Boolean,
    default: false,
  },
  aadharRejected: {
    type: Boolean,
    default: false,
  },
  displayName: {
    type: String,
  },
  photoUrl: {
    type: String,
  },

  token: {
    type: String,
  },
  loginType: {
    type: String,
    enum: ["otp", "google"],
  },
  description: {
    type: String,
  },
  fcmToken: {
    type: String,
  },
  requestleft: {
    type: Number,
    default: 10,
  },
  increasecount: {
    type: Number,
    default: 0,
  }
});

const _model = model("users", UserSchema);

export { _model as usermodel };
