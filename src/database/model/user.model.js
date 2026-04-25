import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
      required: false,
    },
    isActive: { type: Boolean, default: true, required: false},
  },
  { timestamps: true },
);

export const userModel = mongoose.model("users", userSchema);
