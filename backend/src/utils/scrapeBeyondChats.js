import axios from "axios";
import * as cheerio from "cheerio";

const BLOG_URL = "https://beyondchats.com/blogs/";

export const scrapeBeyondChatsBlogs = async () => {
  try {
    const { data } = await axios.get(BLOG_URL);
    const $ = cheerio.load(data);

    const articleLinks = [];

    // Collect blog links
    $("a").each((_, element) => {
      const link = $(element).attr("href");
      if (link && link.startsWith("https://beyondchats.com/blogs/")) {
        articleLinks.push(link);
      }
    });

    // Remove duplicates
    const uniqueLinks = [...new Set(articleLinks)];

    // Take last 5 (oldest)
    const oldestArticles = uniqueLinks.slice(-5);

    const articles = [];

    for (const link of oldestArticles) {
      const { data: articleHTML } = await axios.get(link);
      const $$ = cheerio.load(articleHTML);

      const title = $$("h1").first().text().trim();
      const content = $$("article").text().trim();

      if (title && content) {
        articles.push({
          title,
          content,
          slug: link.split("/").pop(),
        });
      }
    }

    return articles;
  } catch (error) {
    console.error("Scraping failed:", error.message);
    return [];
  }
};
