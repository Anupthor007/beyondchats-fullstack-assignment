# BeyondChats Full Stack Assignment

## Overview

This project is a full‑stack web application built as part of the BeyondChats Full Stack Intern assignment. The system scrapes blog articles from the BeyondChats website, rewrites them using a Large Language Model (LLM), stores both original and updated versions in MongoDB, and displays them in a clean, responsive React frontend.

The goal of the project is to demonstrate real‑world backend design, API separation, LLM integration, and frontend presentation.

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Cheerio (web scraping)
* Google Search (reference discovery)
* Groq LLM (article rewriting)

### Frontend

* React (Vite)
* Axios
* Plain CSS (no UI libraries)

---

## Key Features

* Scrapes blog articles from the BeyondChats website
* Stores original articles in MongoDB
* Automatically rewrites articles using an LLM for improved clarity and structure
* Stores rewritten articles as separate entries with references
* Clean REST API design separating scraping and content creation
* Responsive frontend displaying both ORIGINAL and UPDATED articles
* Clear visual distinction between original and updated content

---

## Project Architecture

```
beyondchats-fullstack-assignment/
│
├── backend/
│   ├── src/
│   │   ├── controllers/   # API logic
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # Express routes
│   │   ├── utils/         # Scraping utilities
│   │   └── server.js      # App entry point
│   │
│   ├── scripts/
│   │   └── rewriteArticles.js  # LLM rewrite automation
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   ├── services/      # API calls
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## Setup Instructions

### Prerequisites

* Node.js (v18 or higher recommended)
* MongoDB (local or Atlas)
* Groq API key

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside the `backend` folder:

```
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Backend runs at:

```
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## API Endpoints

### Article APIs

* `POST /api/articles/scrape`

  * Scrapes articles from the BeyondChats website

* `POST /api/articles`

  * Creates a new article (used by the LLM rewrite script)

* `GET /api/articles`

  * Fetches all articles (original + updated)

* `GET /api/articles/:id`

  * Fetches a single article by ID

* `DELETE /api/articles/:id`

  * Deletes an article

---

## Article Rewrite Flow

1. Scrape original articles from BeyondChats
2. Store original articles in MongoDB
3. Fetch original articles via API
4. Search Google for reference articles
5. Scrape reference content
6. Rewrite article using Groq LLM
7. Store rewritten article separately with references
8. Display both versions in the frontend

---

## Architecture & Data Flow

```
BeyondChats Website
        │
        ▼
Web Scraper (Cheerio)
        │
        ▼
MongoDB
(Original Articles)
        │
        ▼
Rewrite Script (Node.js)
  ├─ Google Search (References)
  ├─ External Article Scraping
  └─ Groq LLM (Content Rewriting)
        │
        ▼
MongoDB
(Updated Articles)
        │
        ▼
REST API (Express)
        │
        ▼
React Frontend (Vite)
```

This architecture separates responsibilities clearly:

* Scraping is isolated from content creation
* LLM rewriting runs as a background script
* Frontend consumes data only through APIs

---

## Design Decisions

* Scraping and article creation are handled by separate endpoints
* Original and updated articles are stored as separate documents
* No UI libraries were used to keep the frontend lightweight and readable
* LLM rewriting is handled via a standalone script to avoid blocking API requests

---

## Notes

* Environment variables are not committed to the repository
* Commit history reflects the development journey step‑by‑step
* The project is fully functional and runs locally

---

## Author

**Anup Thorat**

B.Tech – Artificial Intelligence & Data Science
