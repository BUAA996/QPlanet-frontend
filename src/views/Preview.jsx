import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { view as fill } from 'api/questionaire'
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { useStateStore } from 'store'
import Skeleton from '@material-ui/lab/Skeleton'

import { useSnackbar } from 'notistack'
import CountDown from 'components/utils/CountDown'
import { checkType } from 'api/questionaire'
import SignInForm from 'components/auth/SignInForm'
import { sendCaptcha, checkCaptcha } from 'api/result'
import FillPage from 'components/utils/FillPage'
import LogicalFillPage from 'components/utils/LogicalFillPage'

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
    width: '90%',
  },
  type: {
    color: theme.palette.primary.dark,
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

function Title(props) {
  const classes = useStyles()

  return (
    <>
      <Grid item className={classes.title}>
        <Typography variant='h4'>
          {props.title ? props.title : <Skeleton />}
        </Typography>

        <Typography variant='h5' className={classes.type}>
          {props.title && props.type ? '(' + props.type + ')' : ''}
        </Typography>
      </Grid>

      <Grid item className={classes.description}>
        <Typography varient='h6'>
          {props.description ? props.description : <Skeleton />}
        </Typography>
      </Grid>
    </>
  )
}

function PreviewPage(props) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Grid
        container
        direction='column'
        justifyContent='center'
        S
        alignItems='center'
        spacing={3}
      >
        {props.title}
        <Divider
          flexItem={true}
          variant={'middle'}
          className={classes.divider}
        />
        <Grid item className={classes.problems}>
          {props.Questionare}
        </Grid>
      </Grid>
    </Card>
  )
}

// function Preview2() {
//   const classes = useStyles()
//   const [questionID, setID] = useState(-1)
//   const [title, setTitle] = useState('')
//   const [Questionare, setQuestionare] = useState([])
//   const [description, setDescription] = useState('')
//   const [ansList, setAns] = useState([])
//   const {id} = useParams()
//   const history = useHistory()
//   const isLogin = useStateStore().isLogin

//   useRouteDefender({
//     assert: !isLogin,
//     method: 'push',
//     to: '/signin',
//     msg: '您还未登录，请先登录',
//   })

//   useTitle('预览问卷 - 问卷星球')

//   useEffect(() => {
//     if (isLogin) {
//       setTitle(TITLE)
//       setDescription(DESCRIPTION)
//       setQuestionare([].concat(QUESTIONAIRE))

//       view({hash: id}).then((res) => {
//         // console.log(res);
//         if (res.data.result === 1) {
//           const ori = res.data.questions
//           const settings = res.data
//           let tmp = []
//           for (let i = 0; i < ori.length; ++i) {
//             tmp.push({
//               id: ori[i].id,
//               key: i,
//               description: ori[i].description,
//               kind: ori[i].type,
//               must: ori[i].is_required,
//               title: ori[i].content,
//               choices: ori[i].option,
//             })
//           }
//           setQuestionare([].concat(tmp))
//           setTitle(settings.title)
//           setDescription(settings.description)
//           setID(settings.qid)

//           tmp = new Array(ori.length)
//           for (let i = 0; i < ori.length; ++i) {
//             tmp[i] = {
//               problem_id: ori[i].id,
//               type: ori[i].type,
//               answer: [''],
//             }
//           }
//           setAns(tmp)
//         } else {
//           history.push('/404')
//         }
//       })
//     }
//   }, [])

//   function handleAns(id, singleAns) {
//     let tmp = [].concat(ansList)
//     tmp[id] = {
//       problem_id: tmp[id].problem_id,
//       type: tmp[id].type,
//       answer: singleAns,
//     }
//     setAns(tmp)
//     // console.log(tmp);
//   }

//   function handleClick() {
//     // console.log({id: questionID, results: ansList})
//     // submit({qid: questionID, results: ansList}).then((res) => {
//     //   console.log(res);
//     //   history.push('/');
//     // })
//   }

//   const print = () => {
//     window.document.body.innerHTML =
//       window.document.getElementById('billDetails').innerHTML
//     window.print()
//     window.location.reload()
//   }

//   return (
//     <>
//       <Container maxWidth='md' className={classes.root} id='billDetails'>
//         <Card className={classes.card}>
//           <Grid
//             container
//             direction='column'
//             justifyContent='center'
//             alignItems='center'
//             spacing={3}
//           >
//             <Grid item>提示：在预览状态下不可提交问卷</Grid>
//             <Title title={title} description={description}/>
//             <Divider
//               flexItem={true}
//               variant={'middle'}
//               className={classes.divider}
//             />
//             <Grid item className={classes.problems}>
//               {Questionare.map((problem) => (
//                 <Problem
//                   problem={problem}
//                   key={problem.key}
//                   updateAns={(ans) => handleAns(problem.key, ans)}
//                 />
//               ))}
//             </Grid>
//             <Grid item className={classes.buttons}>
//               <Button
//                 variant='contained'
//                 color='secondary'
//                 onClick={() => handleClick()}
//                 className={classes.buttons}
//               >
//                 {' '}
//                 提交{' '}
//               </Button>
//               <Button
//                 variant='contained'
//                 color='secondary'
//                 onClick={() => history.go(-1)}
//                 className={classes.buttons}
//               >
//                 {' '}
//                 返回{' '}
//               </Button>
//               {/* <Button variant='contained' color='secondary' onClick={() => print()} className={classes.buttons}> 打印 </Button> */}
//             </Grid>
//           </Grid>
//         </Card>
//       </Container>
//       <SpeedDialMenu
//         handleClick={(name) => {
//           if (name === '下载问卷') {
//             downloadQuestionnaire({hash: id}).then((res) => {
//               download(
//                 'https://api.matrix53.top/img/' + res.data.doc_name,
//                 res.data.doc_name
//               )
//             })
//           }
//         }}
//       />
//     </>
//   )
// }

function Preview() {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState(0)
  const [endTime, setEndTime] = useState('2021')
  const [certification, setCertification] = useState('')
  const [vis, setVis] = useState(false)
  const { id } = useParams()
  const isLogin = useStateStore().isLogin
  const [data, setData] = useState({})
  const [ques, setQues] = useState({})

  const CERTIFICATION_LEVEL = [
    'NO_CERTIFICATION',
    'EMAIL_CERTIFICATION',
    'WEAK_CERTIFICATION',
    'STRONG_CERTIFICATION',
  ]
  const FORM_LEVEL = [
    'NORMAL',
    'VOTING_BEFORE',
    'VOTING_AFTER',
    'VOTING_BOTH',
    'VOTING_NO',
    'SIGNUP',
    'TESTING_SCORE',
    'TESTING_CORRECTION',
    'TESTING_BOTH',
    'TESTING_NO',
  ]

  useEffect(() => {

    fill({ hash: id }).then((res) => {
      setQues(res.data)
      if (res.data.deadline != null) {
        setVis(true)
        setEndTime(res.data.deadline)
      }
      setState(2)
    })
  }, [])

  useEffect(() => {
    if (certification === 'EMAIL_CERTIFICATION' && isLogin) setState(2)
  }, [isLogin])

  const [lastTime, setTime] = useState(new Date().getSeconds() - 60)
  const [phone, setPhone] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [res, setRes] = useState({})

  function handleCertification() {
    if (phone.length === 0) {
      enqueueSnackbar('手机号不能位空！', { variant: 'warning' })
      return
    }
    if (checkError()) {
      enqueueSnackbar('请检查手机号的格式！', { variant: 'warning' })
      return
    }
    if (captcha === '') {
      enqueueSnackbar('请输入验证码', { variant: 'warning' })
    }
    checkCaptcha({ phone: phone, captcha: captcha }).then((res) => {
      console.log(res.data)
      if (res.data.result === 1) {
        enqueueSnackbar('验证成功', { variant: 'success' })
        setState(2)
      } else {
        enqueueSnackbar(res.data.message, { variant: 'warning' })
      }
    })
  }

  const handleChangePhone = (event) => {
    setPhone(event.target.value)
    console.log(event.target.value)
  }

  const handleChangeCaptcha = (event) => {
    setCaptcha(event.target.value)
    console.log(event.target.value)
  }

  function checkError() {
    if (phone.length !== 11 && phone.length !== 0) return true
    let flag = false
    for (let i = 0; i < phone.length; ++i)
      flag |= phone[i] < '0' || phone[i] > '9'
    return flag
  }

  function getErrorMSG() {
    return checkError() ? '手机号必须是 11 位整数，不能包含其他字符' : ''
  }

  function handleSend() {
    let now = new Date().getSeconds() - lastTime
    console.log(now)

    if (phone.length === 0) {
      enqueueSnackbar('手机号不能位空！', { variant: 'warning' })
      return
    }
    if (checkError()) {
      enqueueSnackbar('请检查手机号的格式！', { variant: 'warning' })
    } else if (now < 60) {
      enqueueSnackbar('发送太频繁啦！请' + (60 - now) + 's 后再试', {
        variant: 'warning',
      })
    } else {
      sendCaptcha({ phone: phone }).then((res) => {
        if (res.data.result === 1) {
          enqueueSnackbar('发送成功，请在 5 分钟内填写', { variant: 'success' })
          setTime(new Date().getSeconds())
        } else {
          enqueueSnackbar('请输入有效的手机号', { variant: 'error' })
        }
      })
    }
  }

  return (
    <>
      {state === 0 && (
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
                <Skeleton height={80} width={400} />
              </Grid>
              <Grid item className={classes.description}>
                <Skeleton height={40} />
              </Grid>
              <Divider
                flexItem={true}
                variant={'middle'}
                className={classes.divider}
              />
              <Grid item className={classes.buttons}>
                <Skeleton height={120} width={600} />
              </Grid>
            </Grid>
          </Card>
        </Container>
      )}

      {state === 1 && (
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
                <Typography varient='h6'>
                  根据问卷发起人的要求，我们需要对您的身份进行识别。
                </Typography>
              </Grid>
              {certification === 'EMAIL_CERTIFICATION' && (
                <>
                  <Grid item className={classes.description}>
                    <Typography varient='h6'>
                      请您登录您的问卷星球账号，如果是新用户，可以点击右上角注册按钮注册
                    </Typography>
                  </Grid>
                  <Grid item xs={7} className={classes.loginForm}>
                    <SignInForm home={false} />
                  </Grid>
                </>
              )}
              {(certification === 'WEAK_CERTIFICATION' ||
                certification === 'STRONG_CERTIFICATION') && (
                <>
                  {certification === 'WEAK_CERTIFICATION' && (
                    <Grid item className={classes.description}>
                      <Typography varient='h6'>
                        我们保证仅使用下列信息用于区分填写者，不会将任何个人信息透露给问卷发起者
                      </Typography>
                    </Grid>
                  )}
                  {certification === 'STRONG_CERTIFICATION' && (
                    <Grid item className={classes.description}>
                      <Typography varient='h6' className={classes.warning}>
                        注意：应问卷发起者要求，下列信息也会共享给问卷发起者
                      </Typography>
                    </Grid>
                  )}
                  <Grid item className={classes.description}>
                    <Typography varient='h6'></Typography>
                  </Grid>
                  <Grid
                    item
                    xs={7}
                    className={classes.loginForm}
                    container
                    direction='column'
                    justifyContent='center'
                    alignItems='stretch'
                  >
                    <Grid item xs={12} className={classes.textfield}>
                      <TextField
                        label='手机号'
                        value={phone}
                        onChange={handleChangePhone}
                        variant='outlined'
                        error={checkError()}
                        helperText={getErrorMSG()}
                        fullWidth
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className={classes.textfield}
                      container
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <Grid item xs={7}>
                        <TextField
                          label='验证码'
                          value={captcha}
                          onChange={handleChangeCaptcha}
                          variant='outlined'
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          variant='contained'
                          color='primary'
                          size='large'
                          className={classes.formBtn}
                          onClick={() => handleSend()}
                          fullWidth
                        >
                          发送验证码
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      direction='column'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Grid item xs={7} container alignItems='stretch'>
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
              )}
            </Grid>
          </Card>
        </Container>
      )}

      {state === 2 && (
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
            {ques.type === 0 ? (
              <LogicalFillPage
                setState={setState}
                phone={phone}
                need={data.requirement}
                setSubmit={setRes}
                demo={true}
              />
            ) : (
              <FillPage
                setState={setState}
                phone={phone}
                need={data.requirement}
                setSubmit={setRes}
                demo={true}
              />
            )}
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      )}
    </>
  )
}

export default Preview
export { Title, PreviewPage }
