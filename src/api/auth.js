import axios from "http.js";

// register
function register(data) {
  return axios.post("user/logout/", data);
}

// send
function getRegisterId(data) {
  return axios.post("user/send/", data);
}

// login
function login(data) {
  return axios.post("user/login/", data);
}

// logout
function logout(data) {
  return axios.post("user/logout/", data);
}

// getcaptcha
function getCaptcha(data) {
  return axios.post("user/captcha/", data);
}

export { register, getCaptcha, getRegisterId, login, logout };
