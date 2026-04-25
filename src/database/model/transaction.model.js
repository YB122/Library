import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "books", required: true },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date, required: false },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
      required: false,
    },
  },
  { timestamps: true },
);

export const transactionModel = mongoose.model("transactions", transactionSchema);
