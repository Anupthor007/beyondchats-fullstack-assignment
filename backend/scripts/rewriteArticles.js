import axios from "axios";
import googleIt from "google-it";
import * as cheerio from "cheerio";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const API_BASE = "http://localhost:5000/api/articles";

// Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Fetch original articles
async function fetchOriginalArticles() {
  const response = await axios.get(API_BASE);
  return response.data.filter((article) => article.type === "original");
}

// Google search
async function googleSearch(title) {
  try {
    const results = await googleIt({ query: title });

    return results
      .filter(
        (r) =>
          r.link &&
          r.link.startsWith("http") &&
          !r.link.includes("beyondchats.com")
      )
      .slice(0, 2);
  } catch {
    return [];
  }
}

// Scrape article content
async function scrapeContent(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  return $("article").text().trim().slice(0, 2000);
}

// Rewrite using Groq
async function rewriteWithGroq(originalContent, references) {
  const referenceText =
    references.length > 0
      ? references.map((r, i) => `Reference ${i + 1}:\n${r.content}`).join("\n\n")
      : "No external reference articles were available.";

  const prompt = `
You are a professional content writer.

Rewrite the following article to improve structure, clarity, and readability.
Use proper headings and paragraphs. Make it SEO-friendly.

Original Article:
${originalContent}

${referenceText}

Add a "References" section at the end.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "You are a professional content writer." },
      { role: "user", content: prompt },
    ],
    temperature: 0.6,
  });

  return completion.choices[0].message.content;
}

// Save updated article
async function saveUpdatedArticle(originalArticle, updatedContent, references) {
  await axios.post(`${API_BASE}`, {
    title: `${originalArticle.title} (Updated)`,
    content: updatedContent,
    type: "updated",
    references: references.map((ref) => ({
      title: ref.title || "Reference",
      url: ref.link,
    })),
  });
}

// Main runner
async function run() {
  console.log("Rewrite script started (Groq)");

  const articles = await fetchOriginalArticles();

  if (!articles.length) {
    console.log("No original articles found. Exiting.");
    return;
  }

  for (const article of articles) {
    console.log(`Processing article: ${article.title}`);

    const googleResults = await googleSearch(article.title);
    const references = [];

    for (const result of googleResults) {
      const content = await scrapeContent(result.link);
      references.push({ ...result, content });
    }

    const rewrittenContent = await rewriteWithGroq(
      article.content,
      references
    );

    await saveUpdatedArticle(article, rewrittenContent, references);

    console.log("Updated article saved successfully");
  }

  console.log("Phase 2 completed using Groq");
}

run();
