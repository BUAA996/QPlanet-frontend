import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.matrix53.top/",
  timeout: 3000,
  withCredentials: true,
});

export default instance;
