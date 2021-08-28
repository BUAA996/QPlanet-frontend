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
    marginBottom: theme.spacing(4)
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

function FillPage() {
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
      console.log(res);
      setData(res.data);
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
            quota: ori[i].quota
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
      submit({ qid: questionID, results: ansList }).then((res) => {
        // console.log(res);
        enqueueSnackbar('提交成功，感谢您的回答', { variant: 'success' })
        history.replace('/finish')
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

function Fill() {
  const classes = useStyles()
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState(0);
  const [endTime, setEndTime] = useState('');
  const [certification, setCertification] = useState('');
  const [vis, setVis] = useState(false);
  const { id } = useParams();
  const isLogin = useStateStore().isLogin

  const CERTIFICATION_LEVEL = ['NO_CERTIFICATION', 'EMAIL_CERTIFICATION', 'WEAK_CERTIFICATION', 'STRONG_CERTIFICATION']
  const FORM_LEVEL = ['NORMAL', 'VOTING_BEFORE', 'VOTING_AFTER', 'VOTING_BOTH', 'VOTING_NO', 'SIGNUP', 'TESTING_SCORE', 'TESTING_CORRECTION', 'TESTING_BOTH', 'TESTING_NO']

  useEffect(() => {
    checkType({hash: '' + id}).then((res) => {
      // console.log(res.data); 
      const data = res.data;
      if (data.result === 1) {
        setCertification(CERTIFICATION_LEVEL[data.requirement])
        setState(data.requirement === 0 ? 2 : 1);
        if (data.requirement === 1 && isLogin)
          setState(2)
        // console.log(CERTIFICATION_LEVEL[data.requirement])

        fill({hash: id}).then((res) => {
          if (res.data.deadline != null) {
            setVis(true);
            setEndTime(res.data.deadline);
          }
        })

      } else {
        enqueueSnackbar(data.message, {variant: "warning"});
        history.push('/')
      }
    })
  }, [])

  useEffect(() => {
    if (certification === 'EMAIL_CERTIFICATION' && isLogin)
      setState(2);
  }, [isLogin])

  
  const [lastTime, setTime] = useState(new Date().getSeconds() - 60);
  const [phone, setPhone] = useState('');
  const [captcha, setCaptcha] = useState('');
  
  function handleCertification() {
    if (phone.length === 0) {
      enqueueSnackbar('手机号不能位空！', {variant: 'warning'})
      return ;
    }
    if (checkError()) {
      enqueueSnackbar('请检查手机号的格式！', {variant: 'warning'})
      return ;
    }
    if (captcha === '') {
      enqueueSnackbar('请输入验证码', {variant: 'warning'})
    }
    checkCaptcha({phone: phone, captcha: captcha}).then((res) => {
      console.log(res.data);
      if (res.data.result === 1) {
        enqueueSnackbar('验证成功', {variant: 'success'})
        setState(2);
      } else {
        enqueueSnackbar(res.data.message, {variant: 'warning'})
      }
    })
  }

  const handleChangePhone = (event) => {
    setPhone(event.target.value); console.log(event.target.value);
  }

  const handleChangeCaptcha = (event) => {
    setCaptcha(event.target.value); console.log(event.target.value);
  }
 
  function checkError() {
    if (phone.length !== 11 && phone.length !== 0) return true;
    let flag = false;
    for (let i = 0;i < phone.length; ++i)
      flag |= phone[i] < '0' || phone[i] > '9';
    return flag;
  }

  function getErrorMSG() {
    return checkError() ? '手机号必须是 11 位整数，不能包含其他字符' : ''
  }

  function handleSend() {
    let now = new Date().getSeconds() - lastTime;
    console.log(now);
    
    if (phone.length === 0) {
      enqueueSnackbar('手机号不能位空！', {variant: 'warning'})
      return ;
    }
    if (checkError()) {
      enqueueSnackbar('请检查手机号的格式！', {variant: 'warning'})
    } else if (now < 60) {
      enqueueSnackbar('发送太频繁啦！请' + (60 - now) + 's 后再试', {variant: 'warning'})
    } else {
      sendCaptcha({phone: phone}).then((res) => {
        if (res.data.result === 1) {
          enqueueSnackbar('发送成功，请在 5 分钟内填写', {variant: "success"});
          setTime(new Date().getSeconds());
        } else {
          enqueueSnackbar('请输入有效的手机号' , {variant: "error"});
        }
      })
    }
  }

  return (
    <>
      {
        state === 0 && 
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
                <Skeleton height={80} width={400}/>
              </Grid>
              <Grid item className={classes.description}>
                <Skeleton height={40}/>
              </Grid>
              <Divider
                flexItem={true}
                variant={'middle'}
                className={classes.divider}
              />
              <Grid item className={classes.buttons}>
                <Skeleton height={120} width={600}/>
              </Grid>
            </Grid>
          </Card>
        </Container>
      }

      {
        state === 1 && 
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
                <Typography variant='h4'>在填写之前...</Typography>
              </Grid>
              <Grid item className={classes.description}>
                <Typography varient='h6'>根据问卷发起人的要求，我们需要对您的身份进行识别。</Typography>
              </Grid>
              {
                certification === 'EMAIL_CERTIFICATION' && 
                <>
                  <Grid item className={classes.description}>
                    <Typography varient='h6'>请您登录您的问卷星球账号，如果是新用户，可以点击右上角注册按钮注册</Typography>
                  </Grid>
                  <Grid item xs={7} className={classes.loginForm}>
                    <SignInForm home={false} />
                  </Grid>
                </>
              }
              {
                (certification === 'WEAK_CERTIFICATION' || certification === 'STRONG_CERTIFICATION') && 
                <>
                  {
                    certification === 'WEAK_CERTIFICATION' && 
                    <Grid item className={classes.description}>
                      <Typography varient='h6'>我们保证仅使用下列信息用于区分填写者，不会将任何个人信息透露给问卷发起者</Typography>
                    </Grid>
                  }
                  {
                    certification === 'STRONG_CERTIFICATION' && 
                    <Grid item className={classes.description}>
                      <Typography varient='h6' className={classes.warning}>注意：应问卷发起者要求，下列信息也会共享给问卷发起者</Typography>
                    </Grid>
                  }
                  <Grid item className={classes.description}>
                    <Typography varient='h6'></Typography>
                  </Grid>
                  <Grid item xs={7} className={classes.loginForm}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                  >
                    <Grid item xs={12} className={classes.textfield}>
                      <TextField
                        label="手机号"
                        value={phone}
                        onChange={handleChangePhone}
                        variant="outlined"
                        error={checkError()}
                        helperText={getErrorMSG()}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.textfield}
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={7}>
                        <TextField
                          label="验证码"
                          value={captcha}
                          onChange={handleChangeCaptcha}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.formBtn}
                          onClick={() => handleSend()}
                          fullWidth
                        >
                          发送验证码
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item xs={7} container alignItems="stretch">
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='primary'
                          className={classes.formBtn}
                          onClick={() => handleCertification()}
                          size='large'
                        >
                          提交
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              }
            </Grid>
          </Card>
        </Container>
      }

      {
        state === 2 && 
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          className={classes.root}
        >
          <Grid item xs={1}></Grid>
          <Grid item xs={1}>
            {vis && <CountDown time={endTime} />}
          </Grid>
          <Grid item xs={8}>
            <FillPage />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      }
    </>
  )
}

export default Fill
