import axios from 'http.js'

// analyze
function getStatistics(data) {
  return axios.post('result/analyze/', data)
}

// download
function downloadStatistics(data) {
  return axios.post('result/download/', data)
}

// cross_analyze
function crossAnalyze(data) {
  return axios.post('result/cross_analyze/', data)
}

export { getStatistics, downloadStatistics, crossAnalyze }
