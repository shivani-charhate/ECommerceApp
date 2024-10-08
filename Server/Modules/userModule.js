import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    otp: { type: String, required: true },
    role: { type: Boolean, default: false, required: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema);
