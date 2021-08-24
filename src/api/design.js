import axios from 'http.js';

async function getQuestionnaire(id) {
	return await axios.post("questionnaire/view/", {
		hash: id
	});
}

async function saveQuestionaire(info) {
	const ans = await axios.post("questionnaire/modify/", info);
	return ans;

}

export { getQuestionnaire, saveQuestionaire };