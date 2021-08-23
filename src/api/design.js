import axios from 'http.js';

async function getQuestionnaire(id) {
	const ans = await axios.post("questionnaire/view/", {
		hash: id
	});

	return ans;
}

async function saveQuestionaire(info) {
	const ans = await axios.post("questionnaire/modify/", info);
	console.log(info)
	console.log(ans)
	return ans;

}

export { getQuestionnaire, saveQuestionaire };