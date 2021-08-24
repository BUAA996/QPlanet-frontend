import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import { fill as view, submit } from 'api/questionaire'
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Problem from 'components/utils/Problem'
import useTitle from 'hooks/useTitle'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import SpeedDialMenu from 'components/utils/SpeedDialMenu'
import { downloadQuestionnaire } from 'api/questionaire'
import { download } from 'utils'
import { func } from 'prop-types'
import { useSnackbar } from 'notistack'

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
  buttons: {},
}))

const QUESTIONAIRE = [
  {
    id: 1,
    key: 1,
    kind: 0,
    must: 1,
    title: '第一题 balabalabalabala',
    choices: ['选项1', '选项2', '选项3', '选项4'],
  },
  {
    id: 2,
    key: 2,
    kind: 1,
    must: 1,
    title: '第二题 balabalabalabala',
    choices: ['选项1', '选项2', '选项3', '选项4'],
  },
  {
    id: 3,
    key: 3,
    kind: 2,
    must: 0,
    title: '第三题',
    choices: [],
  },
  {
    id: 4,
    key: 4,
    kind: 1,
    must: 0,
    title: '第四题',
    choices: ['选项1', '选项2', '选项3', '选项4'],
  },
  {
    id: 5,
    key: 5,
    kind: 2,
    must: 1,
    title: '第五题',
    choices: ['选项1', '选项2', '选项3', '选项4'],
  },
]

const ANSJSON = {
  qid: 1,
  results: [
    {
      problem_id: 1,
      type: 0,
      answer: ['test1'],
    },
    {
      problem_id: 1,
      type: 1,
      answer: ['test2-1', 'test2-2'],
    },
    {
      problem_id: 1,
      type: 2,
      answer: ['test3'],
    },
  ],
}

const TITLE = '给zht买女装 & lls小课堂 的问卷调查'
const DESCRIPTION =
  '感谢您能抽时间参与本次问卷，您的意见和建议就是我们前行的动力！'

function Fill() {
  useTitle('填写问卷 - 问卷星球')

  const classes = useStyles()
  const [questionID, setID] = useState(-1)
  const [title, setTitle] = useState('')
  const [Questionare, setQuestionare] = useState([])
  const [description, setDescription] = useState('')
  const [ansList, setAns] = useState([])
  const { id } = useParams()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    setTitle(TITLE)
    setDescription(DESCRIPTION)
    setQuestionare([].concat(QUESTIONAIRE))

    view({ hash: id }).then((res) => {
      // console.log(res);
      if (res.data.result === 1) {
        const ori = res.data.questions
        const settings = res.data
        let tmp = []
        for (let i = 0; i < ori.length; ++i) {
          tmp.push({
            id: ori[i].id,
            key: i,
            description: ori[i].description,
            kind: ori[i].type,
            must: ori[i].is_required,
            title: ori[i].content,
            choices: ori[i].option,
          })
        }
        setQuestionare([].concat(tmp))
        setTitle(settings.title)
        setDescription(settings.description)
        setID(settings.qid)

        tmp = new Array(ori.length)
        for (let i = 0; i < ori.length; ++i) {
          tmp[i] = {
            problem_id: ori[i].id,
            type: ori[i].type,
            answer: [''],
          }
        }
        setAns(tmp)
      } else {
        // enqueueSnackbar(res.data.message, {variant: "warning"});
        history.push('/404/')
      }
    })
  }, [])

  function handleAns(id, singleAns) {
    let tmp = [].concat(ansList)
    tmp[id] = {
      problem_id: tmp[id].problem_id,
      type: tmp[id].type,
      answer: singleAns,
    }
    setAns(tmp)
    // console.log(tmp);
  }

  function checkMust() {
    let res = true,
      tmp = ansList.slice()
    Questionare.map((problem, index) => {
      if (problem.must) {
        switch (problem.kind) {
          case 0:
          case 1:
          case 2:
          case 3:
            if (tmp[index].answer.length === 0 || tmp[index].answer[0] == '')
              res = false
            break
          default:
            break
        }
      }
    })
    return res
  }

  function getTodoID() {
    let res = '',
      tmp = ansList.slice()
    Questionare.map((problem, index) => {
      if (problem.must) {
        switch (problem.kind) {
          case 0:
          case 1:
          case 2:
          case 3:
            if (tmp[index].answer.length === 0 || tmp[index].answer[0] == '')
              if (res === '') res = res + (index + 1)
              else res = res + ', ' + (index + 1)
            break
          default:
            break
        }
      }
    })
    return res
  }

  function handleClick() {
    // console.log({id: questionID, results: ansList})
    if (checkMust()) {
      submit({ qid: questionID, results: ansList }).then((res) => {
        // console.log(res);
        history.push('/')
      })
    } else {
      enqueueSnackbar('有必做题尚未完成：' + getTodoID(), {
        variant: 'warning',
      })
    }
  }

  return (
    <>
      <Container maxWidth='md' className={classes.root}>
        <Card className={classes.card}>
          <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
            spacing={3}
          >
            <Grid item className={classes.title}>
              <Typography variant='h4'>{title}</Typography>
            </Grid>
            <Grid item className={classes.description}>
              <Typography varient='h6'>{description}</Typography>
            </Grid>
            <Divider
              flexItem={true}
              variant={'middle'}
              className={classes.divider}
            />
            <Grid item className={classes.problems}>
              {Questionare.map((problem) => (
                <Problem
                  problem={problem}
                  key={problem.key}
                  updateAns={(ans) => handleAns(problem.key, ans)}
                />
              ))}
            </Grid>
            <Grid item className={classes.buttons}>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => handleClick()}
              >
                {' '}
                提交{' '}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <SpeedDialMenu
        handleClick={(name) => {
          if (name === '下载问卷') {
            downloadQuestionnaire({ hash: id }).then((res) => {
              download(
                'https://api.matrix53.top/img/' + res.data.doc_name,
                res.data.doc_name
              )
            })
          }
        }}
      />
    </>
  )
}

export default Fill
