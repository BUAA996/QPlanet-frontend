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
function getCaptcha() {
  return axios.post('user/captcha/')
}

// islogin
function isLogin() {
  return axios.get('user/islogin/')
}

// info
function getUserInfo() {
  return axios.post('user/info/')
}

// change
function changePassword(data) {
  return axios.post('user/change/', data)
}

// getip
function getIP() {
  return axios.get('user/ip/')
}

export {
  register,
  getCaptcha,
  getRegisterId,
  login,
  logout,
  isLogin,
  getUserInfo,
  changePassword,
  getIP,
}
