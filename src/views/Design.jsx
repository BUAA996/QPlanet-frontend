import { makeStyles } from "@material-ui/core/styles";
import QHead from "components/design/QHead";
import Problem from "components/utils/Problem";
import { Container, Button } from "@material-ui/core"
import TitleEdit from "components/design/TitleEdit";
import MovableProblemEdit from "components/design/MovableProblemEdit";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getQuestionnaire, saveQuestionaire } from "api/design";
import { useEffect } from "react";
import useTitle from "hooks/useTitle";
import { isSingleChoice } from "components/utils/Problem";
import { isMultiChoice } from "components/utils/Problem";


const useStyles = makeStyles((theme) => ({}))

const Questionare = [
  {
    id: 1,
    kind: 0,
    must: 1,
    title: '第一题 balabalabalabala',
    choices: ['选项1', '选项2', '选项3', '选项4'],
  },
]


function Design(props) {
  const classes = useStyles();

  const { id } = useParams();
  const [getQ, setQ] = useState(0);
  const [title, setTitle] = useState("一个标题");
  const [detail, setDetail] = useState("这里是一段描述");
  const [questionare, setQuestionare] = useState([]);
  const [qid, setQid] = useState();
  const history = useHistory();

  useEffect(() => {
    let didCancel = false;

    async function fetchMyAPI() {
      const res = await getQuestionnaire(id);
      console.log(res)
      // if (res.result !== 1) {
      //   history.push("/notFound")
      // }

      const data = res.data
      setQ(data.data);
      setTitle(data.title)
      setDetail(data.description)
      setQid(data.qid)
      setQuestionare(data.questions.map((x) => ({
        id: x.id,
        kind: x.type,
        must: x.is_required ? 1 : 0,
        title: x.content,
        description: x.description,
        choices: x.option,
      })))

      // console.log(questionare)
      // if (!didCancel) { // Ignore if we started fetching something else
      //   // console.log(getQ);
      //   // console.log(data.questions)
      //   console.log("load again")
      // }
    }

    fetchMyAPI();
    return () => { didCancel = true; }; // Remember if we start fetching something else
  }, []);



  const qHeadSetFunc = {
    setTitle: setTitle,
    setDetail: setDetail,
  }


  useTitle('问卷编辑 - 问卷星球')

  function addQuestion(index, item) {
    const newQ = questionare.slice()
    const newItem = JSON.parse(JSON.stringify(item))
    newItem.id = Math.random().toString(36).slice(-6)
    if (index === -1) newQ.push(newItem)
    else newQ.splice(index, 0, newItem)
    setQuestionare(newQ)
  }
  function delQuestion(index) {
    const newQ = questionare.slice()
    newQ.splice(index, 1)
    setQuestionare(newQ)
  }
  function editQuestion(index, item) {
    const newQ = questionare.slice()
    newQ.splice(index, 1, item)
    console.log("newQ:", newQ)
    setQuestionare(newQ)
    console.log("questionare", questionare)
  }
  function move(oriIndex, newIndex) {
    const item = questionare.slice()[oriIndex]
    const newQ = questionare.slice()
    newQ.splice(oriIndex, 1)
    newQ.splice(newIndex, 0, item)
    setQuestionare(newQ)
  }
  function addDefault(index) {
    const item = {
      kind: 0,
      must: 1,
      title: '题目',
      description: '',
      choices: [
        '选项1',
        '选项2',
        '选项3'
      ]
    }
    addQuestion(index, item)
  }

  const content = <QHead title={title} detail={detail} />

  function blankFunction() {}

  console.log("qid", qid)
  return (
    <Container maxWidth='md'>
      <TitleEdit
        content={content}
        title={title}
        detail={detail}
        func={qHeadSetFunc}
      />

      {questionare.map((x, index) => (
        <MovableProblemEdit
          key={x.id}
          question={<Problem problem={x} key={x.id} updateAns={() => blankFunction()}/>}
          questionInfo={x}
          index={index}
          move={(newIndex) => move(index, newIndex)}
          del={() => delQuestion(index)}
          add={addQuestion}
          edit={(item) => { editQuestion(index, item) }}
        />))}
      <Button
        color="primary"
        onClick={() => addDefault(-1)}
      >
        添加题目
      </Button>
      <Button
        color="primary"
        onClick={() => {
          saveQuestionaire({
            modify_type: "delete_all_results",
            qid: qid,
            title: title,
            description: detail,
            validity: "2021-8-23 18:20",
            limit_time: 998244353,
            questions: questionare.map((x) => {
              const item = {
                id: x.id,
                type: x.kind,
                content: x.title,
                is_required: x.must === 1 ? true : false,
                description: x.description,
              }
              if (isSingleChoice(x) || isMultiChoice(x))
                item.option = x.choices;
              return item;
            })
          });
          history.push("/overview")
        }
        }
      >
        保存修改
      </Button>


    </Container >);
}

export default Design
