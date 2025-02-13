import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    date: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    images: [
      {
        public_id: { type: String },
        secure_url: { type: String },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", eventSchema);
