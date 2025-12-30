import express from "express";
import {
  scrapeAndStoreArticles,
  createArticle,
  getAllArticles,
  getArticleById,
  deleteArticle,
} from "../controllers/articleController.js";

const router = express.Router();

router.post("/scrape", scrapeAndStoreArticles);
router.post("/", createArticle); // <-- IMPORTANT
router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.delete("/:id", deleteArticle);

export default router;
