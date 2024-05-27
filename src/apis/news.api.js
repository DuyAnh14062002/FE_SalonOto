import axios from "axios";
const newApi = {
  getArticle(page, per_page) {
    return axios.get(
      `https://crawl-data-pink.vercel.app/articles?page=${page}&perPage=${per_page}`
    );
  },
  getDetailArticle(id) {
    return axios.get(`https://crawl-data-pink.vercel.app/articles/${id}`);
  },
};

export default newApi;
