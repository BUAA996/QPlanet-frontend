import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { fill } from 'api/questionaire'
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import CountDown from 'components/utils/CountDown'
import { checkType } from 'api/questionaire'
import { Skeleton } from '@material-ui/lab'
import SignInForm from 'components/auth/SignInForm'
import { useStateStore } from 'store'
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

function Fill() {
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
    checkType({ hash: '' + id }).then((res) => {
      // console.log(res.data);
      const data = res.data
      setData(data)
      if (data.result === 1) {
        setCertification(CERTIFICATION_LEVEL[data.requirement])
        setState(data.requirement === 0 ? 2 : 1)
        if (data.requirement === 1 && isLogin) setState(2)
        // console.log(CERTIFICATION_LEVEL[data.requirement])

        fill({ hash: id }).then((res) => {
          setQues(res.data)
          if (res.data.deadline != null) {
            setVis(true)
            setEndTime(res.data.deadline)
          }
        })
      } else {
        enqueueSnackbar(data.message, { variant: 'warning' })
        history.push('/')
      }
    })
  }, [])

  useEffect(() => {
    if (certification === 'EMAIL_CERTIFICATION' && isLogin) setState(2)
  }, [isLogin])

  const [lastTime, setTime] = useState(new Date().getSeconds() - 60)
  const [phone, setPhone] = useState('')
  const [captcha, setCaptcha] = useState('')

  function handleCertification() {
    if (phone.length === 0) {
      enqueueSnackbar('????????????????????????', { variant: 'warning' })
      return
    }
    if (checkError()) {
      enqueueSnackbar('??????????????????????????????', { variant: 'warning' })
      return
    }
    if (captcha === '') {
      enqueueSnackbar('??????????????????', { variant: 'warning' })
    }
    checkCaptcha({ phone: phone, captcha: captcha }).then((res) => {
      console.log(res.data)
      if (res.data.result === 1) {
        enqueueSnackbar('????????????', { variant: 'success' })
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
    return checkError() ? '?????????????????? 11 ????????????????????????????????????' : ''
  }

  function handleSend() {
    let now = new Date().getSeconds() - lastTime
    console.log(now)

    if (phone.length === 0) {
      enqueueSnackbar('????????????????????????', { variant: 'warning' })
      return
    }
    if (checkError()) {
      enqueueSnackbar('??????????????????????????????', { variant: 'warning' })
    } else if (now < 60) {
      enqueueSnackbar('????????????????????????' + (60 - now) + 's ?????????', {
        variant: 'warning',
      })
    } else {
      sendCaptcha({ phone: phone }).then((res) => {
        if (res.data.result === 1) {
          enqueueSnackbar('????????????????????? 5 ???????????????', { variant: 'success' })
          setTime(new Date().getSeconds())
        } else {
          enqueueSnackbar('???????????????????????????', { variant: 'error' })
        }
      })
    }
  }

  const [needSubmit, setSubmit] = useState(false);

  function handleSubmit() {
    setSubmit(true);
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
                <Typography variant='h4'>???????????????...</Typography>
              </Grid>
              <Grid item className={classes.description}>
                <Typography varient='h6'>
                  ???????????????????????????????????????????????????????????????????????????
                </Typography>
              </Grid>
              {certification === 'EMAIL_CERTIFICATION' && (
                <>
                  <Grid item className={classes.description}>
                    <Typography varient='h6'>
                      ???????????????????????????????????????????????????????????????????????????????????????????????????
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
                        ????????????????????????????????????????????????????????????????????????????????????????????????????????????
                      </Typography>
                    </Grid>
                  )}
                  {certification === 'STRONG_CERTIFICATION' && (
                    <Grid item className={classes.description}>
                      <Typography varient='h6' className={classes.warning}>
                        ??????????????????????????????????????????????????????????????????????????????
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
                        label='?????????'
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
                          label='?????????'
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
                          ???????????????
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
                          ??????
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
            {vis && <CountDown time={endTime} setSubmit={() => handleSubmit()}/>}
          </Grid>
          <Grid item xs={8}>
            {ques.type === 0 ? (
              <LogicalFillPage
                setState={setState}
                phone={phone}
                need={data.requirement}
                finishData={{
                  type: FORM_LEVEL[ques.type],
                  fillData: ques,
                }}
                needSubmit={needSubmit}
              />
            ) : (
              <FillPage
                setState={setState}
                phone={phone}
                need={data.requirement}
                finishData={{
                  type: FORM_LEVEL[ques.type],
                  fillData: ques,
                }}
                needSubmit={needSubmit}
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

export default Fill
