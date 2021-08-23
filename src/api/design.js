import axios from 'http.js';

async function getQuestionnaire(id) {
	const ans = await axios.post("questionnaire/view/", {
		hash: id
	});
	console.log(ans.data)
	return ans;
}

async function saveQuestionaire(info) {
	console.log(info)
	console.log(JSON.stringify(info))
	const ans = await axios.post("questionnaire/modify/", info);

	console.log(ans)
	
	return ans;

}

export { getQuestionnaire, saveQuestionaire };