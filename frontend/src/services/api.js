import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/articles";

export const getArticles = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};
