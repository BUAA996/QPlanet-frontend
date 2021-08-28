const SURVEY = {
  title: '调查问卷',
  description: '感谢您能抽时间参与本次问卷，您的意见和建议就是我们前行的动力！',
  deadline: '2121-01-08 11:59',
  // duration: 120,
  type: 0,
  // random_order: true,
  certification: 0,
  // select_less_score: true,
  show_number: true,
  questions: [
    {
      type: 0,
      content: '单选题',
      is_required: true,
      option: ['选项A', '选项B', '选项C'],
      quota: [-1, -1, -1],
      description: '一道普普通通的选择题',
      // lower: -1,
      // upper: -1,
      // requirement: -1,
    },
  ],
}

const VOTE = {
  title: '投票问卷',
  description: '欢迎参与本次投票，快来为您心仪的选项投上一票吧！',
  deadline: '2121-01-08 11:59',
  // duration: 120,
  type: 3,
  // random_order: true,
  certification: 0,
  // select_less_score: true,
  show_number: true,
  questions: [
    {
      type: 0,
      content: '请在下列选项中投一票',
      is_required: true,
      option: ['选项A', '选项B', '选项C'],
      quota: [-1, -1, -1],
      description: '一道普普通通的单选投票题',
      // lower: -1,
      // upper: -1,
      // requirement: -1,
    },
  ],
}

const EXAM = {
  title: '考试问卷',
  description: '欢迎参加本场考试，预祝您在考试中取得好成绩！',
  deadline: '2121-01-08 11:59',
  duration: 120,
  type: 8,
  random_order: true,
  certification: 0,
  select_less_score: true,
  show_number: true,
  questions: [
    {
      type: 2,
      content: '学号',
      is_required: true,
      // option: ['选项A', '选项B', '选项C'],
      // quota: [-1, -1, -1],
      description: '',
      lower: -1,
      upper: -1,
      requirement: 0,
      is_essential: true,
    },
    {
      type: 2,
      content: '姓名',
      is_required: true,
      // option: ['选项A', '选项B', '选项C'],
      // quota: [-1, -1, -1],
      description: '',
      lower: -1,
      upper: -1,
      requirement: 0,
      is_essential: true,
    },
  ],
}

const CLOCK = {
  title: '疫情打卡问卷',
  description: '请按时打卡，为防控疫情尽到一份自己的责任。',
  deadline: '2121-01-08 11:59',
  // duration: 120,
  type: 0,
  // random_order: true,
  certification: 0,
  // select_less_score: true,
  show_number: true,
  questions: [
    {
      type: 2,
      content: '学号',
      is_required: true,
      // option: ['选项A', '选项B', '选项C'],
      // quota: [-1, -1, -1],
      description: '',
      lower: -1,
      upper: -1,
      requirement: 0,
      is_essential: true,
    },
    {
      type: 2,
      content: '姓名',
      is_required: true,
      // option: ['选项A', '选项B', '选项C'],
      // quota: [-1, -1, -1],
      description: '',
      lower: -1,
      upper: -1,
      requirement: 0,
      is_essential: true,
    },
    {
      type: 0,
      content: '今日体温情况',
      is_required: true,
      option: ['36℃ ~ 36.5℃', '36.5℃ ~ 36.9℃', '37℃ ~ 37.2℃', '37.3℃以上'],
      quota: [-1, -1, -1, -1],
      description: '',
    },
    {
      type: 0,
      content: '是否有高风险地区旅行史',
      is_required: true,
      option: ['是', '否'],
      quota: [-1, -1],
      description: '',
    },
    {
      type: 0,
      content: '是否出现新冠病毒感染症状',
      is_required: true,
      option: ['是', '否'],
      quota: [-1, -1],
      description: '',
    },
    {
      type: 5,
      content: '请确定当前您所在的位置',
      is_required: true,
      // option: ['是', '否'],
      // quota: [-1, -1],
      description: '',
    },
  ],
}

const FORM = {
  title: '报名问卷',
  description: '心动不如行动，填写您的信息，加入我们吧~',
  deadline: '2121-01-08 11:59',
  // duration: 120,
  type: 5,
  // random_order: true,
  certification: 0,
  // select_less_score: true,
  show_number: true,
  questions: [
    {
      type: 2,
      content: '姓名',
      is_required: true,
      // option: ['选项A', '选项B', '选项C'],
      // quota: [-1, -1, -1],
      description: '',
      lower: -1,
      upper: -1,
      requirement: 0,
      is_essential: true,
    },
    {
      type: 2,
      content: '手机号',
      is_required: true,
      // option: ['选项A', '选项B', '选项C'],
      // quota: [-1, -1, -1],
      description: '',
      lower: -1,
      upper: -1,
      requirement: 1,
      is_essential: true,
    },
    {
      type: 0,
      content: '报名活动',
      is_required: true,
      option: ['选项A', '选项B', '选项C', '选项D'],
      quota: [10, 10, 10, 10],
      description: '名额有限，先到先得哦~',
    },
  ],
}

export { SURVEY, VOTE, CLOCK, FORM, EXAM }