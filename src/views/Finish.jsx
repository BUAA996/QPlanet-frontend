import Problem from 'components/utils/Problem'
import { Button, CardContent, Container } from '@material-ui/core'
import useTitle from 'hooks/useTitle'
import {Title, PreviewPage} from 'views/Preview'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
    paddingBottom: theme.spacing(5),
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
    width: '80%',
  },
  problems: {
    minWidth: '90%',
  },
  divider: {
    height: theme.spacing(1),
  },
  buttons: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  test: {
    backgroundColor: theme.palette.secondary.main,
  },
}))

function Finish() {
  useTitle('填写已完成')
  const Questionare = [
    {
      id: 1,
      kind: 0,
      must: 1,
      title: '第一题 balabalabalabala',
      choices: ['选项1', '选项2', '选项3', '选项4'],
    },
    {
      id: 2,
      kind: 1,
      must: 1,
      title: '第二题 balabalabalabala',
      choices: ['选项1', '选项2', '选项3', '选项4'],
    },
    {
      id: 3,
      kind: 2,
      must: 0,
      title: '第三题',
      choices: [],
    },
    {
      id: 4,
      kind: 1,
      must: 0,
      title: '第四题',
      choices: ['选项1', '选项2', '选项3', '选项4'],
    },
    {
      id: 5,
      kind: 2,
      must: 1,
      title: '第五题',
      choices: ['选项1', '选项2', '选项3', '选项4'],
    },
  ]

  
  function blankFunction() {}

  const classes = useStyles();
  const title = <Title title="填写完成" description=""/>  
  const Questions = Questionare.map((problem) => (<Problem problem={problem} updateAns={(ans) => blankFunction()} />));

  return (
    <>

      <Container maxWidth="md" className={classes.root}>
        <PreviewPage title={title} Questionare={null}/>
      </Container>
    </>
  )
}

export default Finish
