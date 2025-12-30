import { useEffect, useState } from "react";
import { getArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return <p className="status-text">Loading articles...</p>;
  }

  return (
    <div className="container">
      <h1 className="title">BeyondChats Articles</h1>

      <div className="articles-grid">
  {articles.length === 0 ? (
    <p>No articles found</p>
  ) : (
    articles.map((article) => (
      <ArticleCard key={article._id} article={article} />
    ))
  )}
</div>

    </div>
  );
}

export default Articles;
