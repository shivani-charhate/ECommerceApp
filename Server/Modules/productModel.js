import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    price: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.ObjectId, ref: "Category", required: true },
    photo: { data: Buffer, contentType: String },
    quantity: { type: String, required: true },
    shipping: { type: Boolean },
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
