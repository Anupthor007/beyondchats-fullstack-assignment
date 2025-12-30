import axios from "axios";

const API_BASE_URL =
  "https://beyondchats-fullstack-assignment-felu.onrender.com/api/articles";

export const getArticles = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};
