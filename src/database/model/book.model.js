import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    availableCopies: { type: Number, required: false, default: 1 },
    isActiveAvailableCopies: { type: Boolean, default: true, required: false },
    isActiveAdmin: { type: Boolean, default: true, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    urlImage: { type: String, required: false },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true },
);

export const bookModel = mongoose.model("books", bookSchema);
