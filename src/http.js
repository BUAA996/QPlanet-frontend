import axios from "axios";

const instance = axios.create({
  baseURL: "http://123.57.194.168:8000/",
  timeout: 3000,
  withCredentials: true,
});

export default instance;
