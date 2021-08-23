import { Button, Card, Container, Divider, Grid, Paper, Typography } from "@material-ui/core";
import { getQuestionnaires } from "api/questionaire"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Problem from "components/utils/Problem";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
    paddingBottom: theme.spacing(5)
  },
  card: {
    padding: theme.spacing(3),
  },
  title: {
    color: theme.palette.primary.main,
  },
  description: {
    color: theme.palette.primary.dark,
    textAlign: 'left',
    width: '80%'
  },
  problems: {
    minWidth: '90%',
  },
  divider: {
    height: theme.spacing(1),
  },
  buttons: {

  }
}));

const QUESTIONAIRE = [
  {
    id: 1, key: 1,
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
    id: 2, key: 2,
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
    id: 3, key: 3,
    kind: 2,
    must: 0,
    title: '第三题',
    choices: []
  },
  {
    id: 4, key: 4,
    kind: 1,
    must: 0,
    title: '第四题',
    choices: [
      '选项1',
      '选项2',
      '选项3',
      '选项4',
    ]
  },
  {
    id: 5, key: 5,
    kind: 2,
    must: 1,
    title: '第五题',
    choices: [
      '选项1',
      '选项2',
      '选项3',
      '选项4',
    ]
  },
];

const ANSJSON = {
  "qid": 1,
  "results": [
    {
      "problem_id": 1,
      "type": 0,
      "answer": ["test1",],
    },
    {
      "problem_id": 1,
      "type": 1,
      "answer": ["test2-1", "test2-2",],
    },
    {
      "problem_id": 1,
      "type": 0,
      "answer": ["test3",],
    },
    {
      "problem_id": 1,
      "type": 2,
      "answer": ["test4-1", "test4-2", "test4-3",],
    },
  ]
}

const TITLE = '给zht买女装 & lls小课堂 的问卷调查';
const DESCRIPTION = '感谢您能抽时间参与本次问卷，您的意见和建议就是我们前行的动力！';

function Fill() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [Questionare, setQuestionare] = useState([]);
  const [description, setDescription] = useState('');
  const [ansInJson, setAns] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setQuestionare([].concat(QUESTIONAIRE))
    setTitle(TITLE);
    setDescription(DESCRIPTION);
  }, [])

  return (
    <Container maxWidth='md' className={classes.root}>
      <Card className={classes.card}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item className={classes.title}>
            <Typography variant='h4'>
              {title}
            </Typography>
          </Grid>
          <Grid item className={classes.description}>
            <Typography varient='h6'>
              {description}
            </Typography>
          </Grid>
          <Divider flexItem={true} variant={'middle'} className={classes.divider} />
          <Grid item className={classes.problems}>
            {Questionare.map((problem) => <Problem problem={problem} ans={ansInJson} setAns={setAns} />)}
          </Grid>
          <Grid item className={classes.buttons}>
            <Button variant='contained' color='secondary'> 提交 </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default Fill;
