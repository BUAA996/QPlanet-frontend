import { makeStyles } from "@material-ui/core/styles";
import QHead from "components/design/QHead";
import Problem from "components/utils/Problem";
import { Container } from "@material-ui/core"
import EditLayer from "components/design/EditLayer";
import ProblemEdit from "components/design/ProblemEdit";
import TitleEdit from "components/design/TitleEdit";
import MovableProblemEdit from "components/design/MovableProblemEdit";

const useStyles = makeStyles((theme) => ({}));

const Questionare = [
  {
    kind: 0,
    must: 1,
    title: '第一题 balabalabalabala',
    choices: [
      '选项1',
      '选项2',
      '选项3',
      '选项4',
    ]
  },
  {
    kind: 1,
    must: 1,
    title: '第二题 balabalabalabala',
    choices: [
      '选项1',
      '选项2',
      '选项3',
      '选项4',
    ]
  },
  {
    kind: 2,
    must: 0,
    title: '第三题',
    choices: []
  },
]


function Design() {
  const classes = useStyles();
  const content = (<QHead title="Title" detail="Nisi qui enim deserunt sint aute ipsum quis cillum officia." />);
  const questions = Questionare.map((x) => <Problem problem={x}></Problem>);
  return (
    <Container maxWidth="md">
      {/* <QHead title="Title" detail="Nisi qui enim deserunt sint aute ipsum quis cillum officia." /> */}
      <TitleEdit content={content}/>

      {questions.map((x) => <MovableProblemEdit question={x} />)}

      
    </Container>);
}

export default Design;
