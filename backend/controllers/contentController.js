import Content from "../models/Content.js";
import path from "path";

export const uploadContent = async (req, res) => {
  try {
    const { title, description, tags, type } = req.body;
    const filePath = `/uploads/${req.file.filename}`;
    const tagsArray = tags?.split(",").map(t => t.trim());

    const content = new Content({
      title,
      description,
      type,
      tags: tagsArray,
      fileUrl: filePath,
      uploadedBy: req.user._id,
    });

    await content.save();
    res.status(201).json(content);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getUserUploads = async (req, res) => {
  try {
    const uploads = await Content.find({ uploadedBy: req.user._id });
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch uploads" });
  }
};

export const getAllContent = async (req, res) => {
  try {
    const allContent = await Content.find({});
    res.json(allContent);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all content" });
  }
};
