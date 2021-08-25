import { TextField, Button, Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatchStore } from 'store'
import { Grid } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { login, getCaptcha } from 'api/auth'
import { useSnackbar } from 'notistack'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import useTitle from 'hooks/useTitle'
import { useStateStore } from 'store'
import useRouteDefender from 'hooks/useRouteDefender'
import { useState } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
  title: {
    alignSelf: 'normal',
    width: '100%',
    fontWeight: 'bolder',
    marginTop: theme.spacing(2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  formBtn: {
    borderRadius: theme.shape.borderRadius * 8,
    height: '50px',
    marginTop: theme.spacing(1),
  },
  link: {
    width: '100%',
    marginTop: theme.spacing(2),
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  captcha: {
    height: 56,
    width: 178,
    marginTop: theme.spacing(2),
    borderRadius: 4,
    cursor: 'pointer',
  },
}))

function SignInForm() {
  const dispatch = useDispatchStore()
  const { enqueueSnackbar } = useSnackbar()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const classes = useStyles()
  const history = useHistory()
  const isLogin = useStateStore().isLogin
  const [webCaptcha, setWebCaptcha] = useState('')
  const [webCaptchaUrl, setWebCaptchaUrl] = useState('')

  useRouteDefender({ assert: isLogin, msg: '您已登录，无需重复登录' })

  useEffect(() => {
    if (!isLogin) {
      getCaptcha().then((res) => {
        setWebCaptcha(res.data.key)
        setWebCaptchaUrl('https://api.matrix53.top' + res.data.new_cptch_image)
      })
    }
  }, [])

  useTitle('登录 - 问卷星球')

  const username = register('username', {
    required: { value: true, message: '用户名不能为空' },
  })
  const password = register('password', {
    required: { value: true, message: '密码不能为空' },
  })
  const captcha = register('captcha', {
    required: { value: true, message: '验证码不能为空' },
  })

  const onSubmit = (data) => {
    if (data.captcha !== webCaptcha) {
      enqueueSnackbar('验证码错误', { variant: 'warning' })
      return
    }
    login(data).then((res) => {
      if (res.data.result) {
        enqueueSnackbar('登录成功', { variant: 'success' })
        dispatch({ type: 'login' })
        history.replace('/overview')
      } else {
        enqueueSnackbar(res.data.message, { variant: 'warning' })
      }
    })
  }

  return (
    <>
      <Typography component='h1' variant='h4' className={classes.title}>
        登录
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          label='用户名'
          margin='normal'
          fullWidth
          onChange={username.onChange}
          name={username.name}
          inputRef={username.ref}
          error={!!errors.username}
          helperText={errors.username && errors.username.message}
          variant='outlined'
        />
        <TextField
          label='密码'
          margin='normal'
          fullWidth
          onChange={password.onChange}
          name={password.name}
          inputRef={password.ref}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
          variant='outlined'
          type='password'
        />
        <Grid container>
          <Grid xs={6}>
            <TextField
              label='验证码'
              margin='normal'
              fullWidth
              onChange={captcha.onChange}
              name={captcha.name}
              inputRef={captcha.ref}
              error={!!errors.captcha}
              helperText={errors.captcha && errors.captcha.message}
              variant='outlined'
            />
          </Grid>
          <Grid xs={6} container justifyContent='flex-end'>
            {webCaptchaUrl === '' ? (
              <Skeleton variant='rect' className={classes.captcha} />
            ) : (
              <img
                src={webCaptchaUrl}
                alt=''
                className={classes.captcha}
                onClick={() => {
                  getCaptcha().then((res) => {
                    setWebCaptcha(res.data.key)
                    setWebCaptchaUrl(
                      'https://api.matrix53.top' + res.data.new_cptch_image
                    )
                  })
                }}
              />
            )}
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.formBtn}
          size='large'
        >
          登录
        </Button>
      </form>
      <Link
        variant='body1'
        component={RouterLink}
        to='/signup'
        className={classes.link}
      >
        Don't have an account? Sign Up
      </Link>
    </>
  )
}

export default SignInForm
