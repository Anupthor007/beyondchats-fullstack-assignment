import express from "express";
import {
  scrapeAndStoreArticles,
  getAllArticles,
  getArticleById,
  deleteArticle,
} from "../controllers/articleController.js";

const router = express.Router();

// Create
router.post("/scrape", scrapeAndStoreArticles);

// Read
router.get("/", getAllArticles);
router.get("/:id", getArticleById);

// Delete
router.delete("/:id", deleteArticle);

export default router;
