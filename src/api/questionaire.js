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

// release
function release(data) {
	return axios.post("questionnaire/release/", data);
}

// close 
function close(data) {
	return axios.post("questionnaire/close/", data);
}

// view 
function view(data) {
	return axios.post("questionnaire/view/", data);
}

// submit
function submit(data) {
	return axios.post("result/submit/", data);
}

// search 
function search(data) {
  return axios.post("questionnaire/search/", data)
}

// copy 
function copy(data) {
  return axios.post("questionnaire/copy/", data)
}

export {createQuestionnaire, deleteQuestionnaire, recover, getQuestionnaires, reset, view, submit, search, release, close, copy};