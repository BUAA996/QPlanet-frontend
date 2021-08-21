import axios from "axios";

const instance = axios.create({
  baseURL: "123.57.194.168:8000/",
  timeout: 3000,
});

export default instance;
