import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["original", "updated"],
      default: "original",
    },
    references: [
      {
        title: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
export default Article;
