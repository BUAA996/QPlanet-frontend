import axios from 'http.js';
import {isMultiChoice, isSingleChoice} from "../components/utils/Problem";

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
  console.log("ori", data)
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
      settings.displayScore = true;
      settings.displayAns = false;
      break;
    case 7:
      type = "EXAM";
      settings.displayScore = false;
      settings.displayAns = true;
      break;
    case 8:
      type = "EXAM";
      settings.displayScore = true;
      settings.displayAns = true;
      break;
    case 9:
      type = "EXAM";
      settings.displayScore = false;
      settings.displayAns = false;
      break;
  }

  settings.showIdx = data.show_number;
  settings.selectLessScore = data.select_less_score;
  // settings.duration = data.duration;
  settings.randonOrder = data.randonOrder;
  settings.hasQuota = data.quota === -1 ? "0" : "1";
  settings.quota = data.quota;
  settings.certification = data.certification;
  settings.deadline = data.deadline;

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

function transformSave(data) {

  return {
    modify_type: data.modifyType,
    qid: data.qid,
    title: data.title,
    description: data.detail,
    deadline: data.settings.deadline,
    // duration: data.settings.duration,
    random_order: data.settings.randomOrder,
    certification: data.settings.certification,
    show_number: data.settings.showIdx,
    questions: data.questions.map((x) => {
        const item = {
          id: x.id,
          type: x.kind,
          content: x.title,
          is_required: x.must === 1,
          description: x.description,
        }
        if (isSingleChoice(x) || isMultiChoice(x)) item.option = x.choices
        return item
      }
    )
  }
}

async function saveQuestionaire(info) {
  return await axios.post("questionnaire/modify/", info);
}

export {getQuestionnaire, saveQuestionaire, transformGet, transformSave};