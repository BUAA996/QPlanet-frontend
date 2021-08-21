import axios from 'http.js';

// create
function createQuestionnaire(data) {
  return axios.post("questionnaire/create/", data);
}

// delete
function deleteQuestionnaire(data) {
  return axios.post("questionnaire/delete/", data);
}

// recover
function recover(data) {
  return axios.post("questionnaire/recover/", data);
}

// list
function getQuestionnaires() {
  return axios.post("questionnaire/list/");
}

// reset
function reset(data) {
	return axios.post("questionnaire/reset/", data);
}

export {createQuestionnaire, deleteQuestionnaire, recover, getQuestionnaires, reset};