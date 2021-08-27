import axios from 'http.js';

async function getQuestionnaire(id) {
  return await axios.post("questionnaire/view/", {
    hash: id
  });
}

// const data = res.data
// setQ(data.data)
// setDetail(data.description)

// handleSetQuestionnaire(
// data.questions.map((x) => ({
//   id: x.id,
//   kind: x.type,
//   must: x.is_required ? 1 : 0,
//   title: x.content,
//   description: x.description,
//   choices: x.option == null ? [] : x.option,
// }))
// )

async function transformGet(data) {
  let type = "";
  let settings = {}
  if (data.type === 0) {
    type = "normal"
  }
  switch (data.type) {
    case 0 :
      type = "NORMAL";
      break;
    case 1:
      type = "VOTE";
      settings.before = "1";
      settings.after = "0";
      break;
    case 2:
      type = "VOTE";
      settings.before = "0";
      settings.after = "1";
      break;
    case 3:
      type = "VOTE";
      settings.before = "1";
      settings.after = "1";
      break;
    case 4:
      type = "VOTE";
      settings.before = '0';
      settings.after = '0';
      break;
    case 5:
      type = "SIGNUP";
      break;
    case 6:
      type = "EXAM";
      settings.score = "1";
      settings.ans = "0";
      break;
    case 7:
      type = "EXAM";
      settings.score = "0";
      settings.ans = "1";
      break;
    case 8:
      type = "EXAM";
      settings.score = "1";
      settings.ans = "1";
      break;
    case 9:
      type = "EXAM";
      settings.score = "0";
      settings.ans = "0";
      break;
  }

  settings.showIdx = data.show_number;
  settings.selectLessScore = data.select_less_score;
  settings.duration = data.duration;
  settings.certification = data.certification;

  return {
    qid: data.qid,
    title: data.title,
    detail: data.description,
    type: type,
    settings: settings,
    questions: data.questions.map((x) => ({
      id: x.id,
      kind: x.type,
      must: x.is_required ? 1 : 0,
      title: x.content,
      description: x.description,
      choices: x.option == null ? [] : x.option,
    }))
  }
}

async function saveQuestionaire(info) {
  return await axios.post("questionnaire/modify/", info);
}

export {getQuestionnaire, saveQuestionaire, transformGet};