import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { createQuestionnaire, fill, submit } from 'api/questionaire'
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Problem from 'components/utils/Problem'
import useTitle from 'hooks/useTitle'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import SpeedDialMenu from 'components/utils/SpeedDialMenu'
import { download } from 'utils'
import { useSnackbar } from 'notistack'
import CountDown from 'components/utils/CountDown'
import { downloadQuestionnaire, checkType } from 'api/questionaire'
import { Skeleton } from '@material-ui/lab'
import SignInForm from 'components/auth/SignInForm'
import { useStateStore } from 'store'
import { sendCaptcha, checkCaptcha } from 'api/result'
import { setDate } from 'date-fns/esm'

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
  loginForm: {
    marginBottom: theme.spacing(4),
  },
  warning: {
    color: 'red',
  },
  textfield: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  formBtn: {
    borderRadius: theme.shape.borderRadius * 8,
    height: '50px',
    marginTop: theme.spacing(1),
    color: 'white',
    fontSize: '1.2em',
  },
}))

export default function FillPage(props) {
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
  const [data, setData] = useState({})

  useEffect(() => {
    fill({ hash: id }).then((res) => {
      console.log(res)
      setData(res.data)
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
            quota: ori[i].quota,
            count: ori[i].count,
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
    // console.log(tmp)
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
      let tmp = { qid: questionID, results: ansList }
      if (props.need > 1) {
        tmp = { ...tmp, phone: props.phone }
      }
      submit(tmp).then((res) => {
        // console.log(res);
        enqueueSnackbar('提交成功，感谢您的回答', { variant: 'success' })
        history.replace('/finish', { ...props.finishData, result: res.data })
      })
    } else {
      enqueueSnackbar('有必做题尚未完成：' + getTodoID(), {
        variant: 'warning',
      })
    }
  }

  return (
    <>
      <Container maxWidth='md'>
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
                  showindex={data.show_number}
                  showquota={problem.quota[0] === -1 ? false : true}
                  showvote={data.type === 3 || data.type === 1}
                  fillmode={true}
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
