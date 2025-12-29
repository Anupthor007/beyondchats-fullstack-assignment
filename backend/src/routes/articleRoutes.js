import express from "express";
import { scrapeAndStoreArticles } from "../controllers/articleController.js";

const router = express.Router();

router.post("/scrape", scrapeAndStoreArticles);

export default router;
