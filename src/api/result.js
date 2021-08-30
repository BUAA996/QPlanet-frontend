import axios from 'http.js'

// analyze
function getStatistics(data) {
  return axios.post('result/analyze/', data)
}

// download
function downloadStatistics(data) {
  return axios.post('result/download/', data)
}

function sendCaptcha(data) {
  return axios.post('result/send_captcha/', data)
}

function checkCaptcha(data) {
  return axios.post('result/check_captcha/', data)
}

function surplus(data) {
  return axios.post('question/surplus/', data)
}

// cross_analyze
function crossAnalyze(data) {
  return axios.post('result/cross_analyze/', data)
}

// get_total
function getTotal(data) {
  return axios.post('result/get_total/', data)
}

export {
  getStatistics,
  downloadStatistics,
  crossAnalyze,
  sendCaptcha,
  checkCaptcha,
  surplus,
  getTotal,
}
