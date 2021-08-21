import axios from "http.js";

// register
function register(data) {
  return axios.post("user/register/", data);
}

// send
function getRegisterId(data) {
  return axios.post("user/getcode/", data);
}

// login
function login(data) {
  return axios.post("user/login/", data);
}

// logout
function logout() {
  return axios.post("user/logout/");
}

// getcaptcha
function getCaptcha(data) {
  return axios.post("user/captcha/", data);
}

export { register, getCaptcha, getRegisterId, login, logout };
