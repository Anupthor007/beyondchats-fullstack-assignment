import { useState } from "react";
import "./ArticleCard.css";

function ArticleCard({ article }) {
  const [expanded, setExpanded] = useState(false);

  const previewText = expanded
    ? article.content
    : article.content.slice(0, 220) + "...";

  return (
    <div className="article-card">
      <div className="article-header">
        <h2 className="article-title">{article.title}</h2>

        <span
          className={`badge ${
            article.type === "updated" ? "updated" : "original"
          }`}
        >
          {article.type.toUpperCase()}
        </span>
      </div>

      <p className="article-content">{previewText}</p>

      <button
        className="read-more-btn"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show less" : "Read more"}
      </button>

      {article.references?.length > 0 && (
        <div className="references">
          <h4>References</h4>
          <ul>
            {article.references.map((ref, index) => (
              <li key={index}>
                <a href={ref.url} target="_blank" rel="noreferrer">
                  {ref.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ArticleCard;
