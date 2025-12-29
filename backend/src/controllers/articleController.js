import Article from "../models/Article.js";
import { scrapeBeyondChatsBlogs } from "../utils/scrapeBeyondChats.js";

// SCRAPE + CREATE
export const scrapeAndStoreArticles = async (req, res) => {
  try {
    const articles = await scrapeBeyondChatsBlogs();

    if (!articles.length) {
      return res.status(400).json({ message: "No articles found" });
    }

    const savedArticles = [];

    for (const article of articles) {
      const exists = await Article.findOne({ title: article.title });
      if (!exists) {
        const saved = await Article.create(article);
        savedArticles.push(saved);
      }
    }

    res.json({
      message: "Articles scraped and stored successfully",
      count: savedArticles.length,
      articles: savedArticles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
