import axios from "axios";
const newApi = {
  getArticle() {
    return axios.get(
      "https://crawl-data-pink.vercel.app/articles?page=1&perPage=10"
    );
  },
  getDetailArticle(id) {
    return axios.get(`https://crawl-data-pink.vercel.app/articles/${id}`);
  },
};

export default newApi;
