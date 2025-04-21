import mongoose from "mongoose";

const LostFoundSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["Lost", "Found"],
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    moderationStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Approved", "Rejected"],
    },
    itemName: {
      type: String,
      required: true,
    },
    reporterName: {
      type: String,
      required: true,
    },
    reporterEmail: {
      type: String,
      required: true,
    },
    isFound: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const LostFound = mongoose.model("LostFound", LostFoundSchema);
export default LostFound;
