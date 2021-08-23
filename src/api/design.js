import axios from 'http.js';

async function getQuestionnaire(id) {
	const ans = await axios.post("questionnaire/view/", {
		hash: id
	});

	return ans;
}


export { getQuestionnaire };