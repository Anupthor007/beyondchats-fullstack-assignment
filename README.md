# BeyondChats Full‑Stack Assignment

A full‑stack web application that scrapes articles from the BeyondChats blog, stores the original content in MongoDB, rewrites selected articles using an LLM, and displays both original and updated versions via a React frontend.

This project was built as part of the **BeyondChats – Full Stack Web Developer Intern Assignment**.

---

## Live Demo

* **Frontend **
  [https://beyondchats-fullstack-assignment-tau.vercel.app/](https://beyondchats-fullstack-assignment-tau.vercel.app/)

* **Backend API **
  [https://beyondchats-fullstack-assignment-felu.onrender.com/api/articles](https://beyondchats-fullstack-assignment-felu.onrender.com/api/articles)

> Note: I have hosted backend on Render Free Tier so it will some time to load due to cold start.

---

## Features

* Scrapes articles from the BeyondChats blog
* Stores original articles in MongoDB
* Rewrites articles using an LLM (Groq)
* Maintains both **original** and **updated** versions
* RESTful APIs for article retrieval
* React frontend to display articles
* Clean separation of backend, AI processing, and frontend
* Fully deployed backend and frontend

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Cheerio (web scraping)
* Groq LLM API

### Frontend

* React (Vite)
* Axios
* CSS

### Deployment

* Backend: Render
* Frontend: Vercel

---

## Architecture & Data Flow

```
┌──────────────────┐
│ BeyondChats Blog │
└─────────┬────────┘
          │ (Scrape)
          ▼
┌──────────────────────────┐
│ Scraper (Cheerio)        │
└─────────┬────────────────┘
          │
          ▼
┌──────────────────────────┐
│ MongoDB                  │
│ - Original Articles      │
│ - Updated Articles       │
└─────────┬────────────────┘
          │
          ▼
┌──────────────────────────┐
│ LLM Rewrite (Groq API)   │
└─────────┬────────────────┘
          │
          ▼
┌──────────────────────────┐
│ Express REST API         │
│ /api/articles            │
└─────────┬────────────────┘
          │
          ▼
┌──────────────────────────┐
│ React Frontend (Vercel)  │
└──────────────────────────┘
```

---

## Project Structure

```
beyondchats-fullstack-assignment/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── articleController.js
│   │   ├── models/
│   │   │   └── Article.js
│   │   ├── routes/
│   │   │   └── articleRoutes.js
│   │   ├── utils/
│   │   │   └── scrapeBeyondChats.js
│   │   └── server.js
│   ├── scripts/
│   │   └── rewriteArticles.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## Environment Variables

Create a `.env` file inside the **backend** directory.

### `.env.example`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

### Description

* `PORT` – Port on which backend runs (default: 5000)
* `MONGO_URI` – MongoDB connection string
* `GROQ_API_KEY` – API key for Groq LLM

> The `.env` file is intentionally not committed for security reasons.

---

## Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173` and backend on `http://localhost:5000`.

---

## API Endpoints

* `GET /api/articles`
  Fetch all original and updated articles

* `POST /api/articles/scrape`
  Scrape and store original articles

---

## Notes

* Render free tier may sleep after inactivity
* First API request may take a few seconds
* Frontend automatically consumes deployed backend API

---

## Author

**Anup Thorat**

Final year B.Tech student (AI & Data Science)

---

## Status

Project completed and deployed successfully.
