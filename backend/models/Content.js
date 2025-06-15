import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  type: { type: String, enum: ["video", "paper"], required: true },
  fileUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  views: { type: Number, default: 0 },
}, { timestamps: true });

const Content = mongoose.model("Content", contentSchema);
export default Content;
