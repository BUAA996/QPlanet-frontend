import axios from 'http.js'

// analyze
function getStatistics(data) {
  return axios.post('result/analyze/', data)
}

export { getStatistics }
