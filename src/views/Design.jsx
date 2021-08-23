import { makeStyles } from "@material-ui/core/styles";
import QHead from "components/design/QHead";
import Problem from "components/utils/Problem";
import { Container, Button } from "@material-ui/core"
import TitleEdit from "components/design/TitleEdit";
import MovableProblemEdit from "components/design/MovableProblemEdit";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionnaire } from "api/design";
import { useEffect } from "react";
import useTitle from "hooks/useTitle";


const useStyles = makeStyles((theme) => ({}))

// const Questionare = [
//   {
//     id: 1,
//     kind: 0,
//     must: 1,
//     title: '第一题 balabalabalabala',
//     choices: ['选项1', '选项2', '选项3', '选项4'],
//   },
//   {
//     id: 2,
//     kind: 1,
//     must: 1,
//     title: '第二题 balabalabalabala',
//     choices: ['选项1', '选项2', '选项3', '选项4'],
//   },
//   {
//     id: 3,
//     kind: 2,
//     must: 0,
//     title: '第三题',
//     choices: [],
//   },
// ]


function Design(props) {
  const classes = useStyles();

  const { id } = useParams();
  const [getQ, setQ] = useState(0);
  const [title, setTitle] = useState("一个标题");
  const [detail, setDetail] = useState("这里是一段描述");
  const [questionare, setQuestionare] = useState([]);

  useEffect(() => {
    let didCancel = false;

    async function fetchMyAPI() {
      const res = await getQuestionnaire(id);
      const data = res.data
      setQ(data.data);
      setTitle(data.title)
      setDetail(data.description)
      setQuestionare(data.questions)

      if (!didCancel) { // Ignore if we started fetching something else
        // console.log(getQ);
        // console.log(data.questions)
      }
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
    setQuestionare(newQ)
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
      choices: [
        '选项1',
        '选项2',
      ]
    }
    addQuestion(index, item)
  }

  const content = <QHead title={title} detail={detail} />

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
          question={<Problem problem={x} />}
          questionInfo={x}
          index={index}
          move={(newIndex) => move(index, newIndex)}
          del={() => delQuestion(index)}
          add={addQuestion}
          edit={(item) => { editQuestion(index, item) }}
        />))}
      <Button
        color="primary"
        onClick={addDefault}
      >
        添加题目
      </Button>


    </Container>);
}

export default Design
