import axios from 'http.js';

async function getQuestionnaire(id) {
  return await axios.post("questionnaire/view/", {
    hash: id
  });
}

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
      settings.displayBefore = true;
      settings.displayAfter = false;
      break;
    case 2:
      type = "VOTE";
      settings.displayBefore = false;
      settings.displayAfter = true;
      break;
    case 3:
      type = "VOTE";
      settings.displayBefore = true;
      settings.displayAfter = true;
      break;
    case 4:
      type = "VOTE";
      settings.displayBefore = false;
      settings.displayAfter = false;
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
  const date = new Date().toISOString().substr(0, 16);
  settings.showIdx = data.show_number;
  settings.selectLessScore = data.select_less_score;
  settings.randomOrder = data.random_order;
  settings.hasQuota = data.quota !== -1 && data.quota !== null && data.quota !== undefined;
  settings.quota = data.quota;
  settings.certification = data.certification;
  settings.hasDdl = !!data.deadline;
  settings.deadline = data.deadline ?? date.substr(0, 10) + ' ' + date.substr(11, 5);

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
      isEssential: x.is_essential ?? true,
      title: x.content,
      description: x.description ?? "",
      choices: x.option ?? [],
      quota: x.quota,
      lower: x.lower ?? 0,
      upper: x.upper,
      requirement: x.requirement,
      standardAnswer: x.standard_answer,
    }))
  }
}

function transformSave(data) {
  console.log("before change", data)

  let type = 0;
  const settings = data.settings;
  if (data.type === "VOTE") {
    if (settings.displayBefore && !settings.displayAfter)
      type = 1;
    else if (!settings.displayBefore && settings.displayAfter)
      type = 2
    else if (settings.displayBefore && settings.displayAfter)
      type = 3
    else if (!settings.displayBefore && !settings.displayAfter)
      type = 4
  } else if (data.type === "SIGNUP") {
    type = 5;
  } else if (data.type === "EXAM") {
    if (settings.displayScore && !settings.displayAns)
      type = 6;
    else if (!settings.displayScore && settings.displayAns)
      type = 7;
    else if (settings.displayScore && settings.displayAns)
      type = 8;
    else if (!settings.displayScore && !settings.displayAns)
      type = 9;
  }

  return {
    modify_type: data.modify_type,
    qid: data.qid,
    title: data.title,
    description: data.detail,
    deadline: data.settings.hasDdl ? data.settings.deadline : null,/////// data.settings.deadline, ////////
    duration: 300,
    random_order: data.settings.randomOrder,
    certification: data.settings.certification,
    show_number: data.settings.showIdx,
    type: type,
    quota: data.settings.hasQuota ? data.settings.quota : -1,
    questions: data.questions.map((x) => {
        return {
          id: x.id,
          type: x.kind,
          content: x.title,
          is_required: x.must === 1,
          is_essential: x.isEssential ?? false,
          quota: x.quota,
          description: x.detail ?? "",
          option: x.choices,
          lower: x.lower ?? 0,
          upper: x.upper ?? 500,
          requirement: x.requirement ?? 0,
          standard_answer: x.standardAnswer
        };
      }
    )
  }
}

async function saveQuestionaire(info) {
  console.log("push", info)
  console.log("info", JSON.stringify(info))
  const ans = await axios.post("questionnaire/modify/", info);
  console.log("get save", ans)
  return ans;
}

export {getQuestionnaire, saveQuestionaire, transformGet, transformSave};