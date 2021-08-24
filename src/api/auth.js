import axios from 'http.js'

// register
function register(data) {
  return axios.post('user/register/', data)
}

// send
function getRegisterId(data) {
  return axios.post('user/getcode/', data)
}

// login
function login(data) {
  return axios.post('user/login/', data)
}

// logout
function logout() {
  return axios.post('user/logout/')
}

// getcaptcha
function getCaptcha(data) {
  return axios.post('user/captcha/', data)
}

// islogin
function isLogin() {
  return axios.get('user/islogin/')
}

// info
function getUserInfo() {
  axios.post('user/info/')
}

// change
function changePassword(data) {
  axios.post('user/change/', data)
}

export {
  register,
  getCaptcha,
  getRegisterId,
  login,
  logout,
  isLogin,
  getUserInfo,
}
