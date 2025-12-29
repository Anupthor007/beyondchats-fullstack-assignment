import Article from "../models/Article.js";
import { scrapeBeyondChatsBlogs } from "../utils/scrapeBeyondChats.js";

export const scrapeAndStoreArticles = async (req, res) => {
  try {
    const articles = await scrapeBeyondChatsBlogs();

    if (!articles.length) {
      return res.status(400).json({ message: "No articles found" });
    }

    const savedArticles = [];

    for (const article of articles) {
      const exists = await Article.findOne({ slug: article.slug });
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
