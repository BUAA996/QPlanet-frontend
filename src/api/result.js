import axios from 'http.js'

// analyze
function getStatistics(data) {
  return axios.post('result/analyze/', data)
}

// download
function downloadStatistics(data) {
  return axios.post('result/download', data)
}

export { getStatistics, downloadStatistics }
