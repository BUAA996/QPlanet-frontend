import { TextField, Button, Grid, Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getRegisterId as getCaptcha, register as signUp } from 'api/auth'
import useTitle from 'hooks/useTitle'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, Link as RouterLink } from 'react-router-dom'

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
  captchaBtn: {
    marginTop: '12px',
    height: '40px',
    width: '97%',
    borderRadius: theme.shape.borderRadius * 8,
  },
  formBtn: {
    borderRadius: theme.shape.borderRadius * 8,
    height: '45px',
    marginTop: theme.spacing(1.5),
  },
  link: {
    width: '100%',
    marginTop: theme.spacing(2),
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  formItem: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
  },
}))

function SignUpForm() {
  const classes = useStyles()
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm()
  const [btnOpen, setBtnOpen] = useState(true)
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()

  useTitle('注册 - 问卷星球')

  const username = register('username', {
    required: { value: true, message: '用户名不能为空' },
  })
  const password1 = register('password1', {
    required: { value: true, message: '密码不能为空' },
  })
  const password2 = register('password2', {
    required: { value: true, message: '密码不能为空' },
  })
  const email = register('email', {
    required: { value: true, message: '邮箱不能为空' },
    pattern: {
      value: /[a-z0-9]+@[a-z0-9]+(\.[a-z0-9]+)+/i,
      message: '请输入格式正确的邮箱',
    },
  })
  const captcha = register('captcha', {
    required: { value: true, message: '验证码不能为空' },
  })

  const onSubmit = (data) => {
    if (data.password1 !== data.password2) {
      enqueueSnackbar('两次输入的密码不一致', { variant: 'warning' })
      return
    }
    let { captcha } = data
    let newData = {
      username,
      password1,
      password2,
      email,
      code: captcha,
    }
    signUp(newData).then((res) => {
      if (res.data.result) {
        enqueueSnackbar(res.data.message, { variant: 'success' })
        history.push('/signin')
      } else {
        enqueueSnackbar(res.data.message, { variant: 'warning' })
      }
    })
  }
  const clickGetCaptcha = () => {
    let email = getValues('email')
    if (/[a-z0-9]+@[a-z0-9]+(\.[a-z0-9]+)+/i.test(email)) {
      getCaptcha({ email: email }).then((res) => {
        if (res.data.result) {
          enqueueSnackbar(res.data.message, { variant: 'success' })
          setBtnOpen(false)
        } else {
          enqueueSnackbar('验证码发送失败，请检查网络设置', {
            variant: 'warning',
          })
        }
      })
    } else {
      enqueueSnackbar('请输入正确的邮箱', { variant: 'warning' })
    }
  }

  return (
    <>
      <Typography component='h1' variant='h4' className={classes.title}>
        注册
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          label='用户名'
          margin='normal'
          fullWidth
          onChange={username.onChange}
          inputRef={username.ref}
          name={username.name}
          error={!!errors.username}
          helperText={errors.username && errors.username.message}
          variant='outlined'
          className={classes.formItem}
          size='small'
        />
        <TextField
          label='密码'
          margin='normal'
          fullWidth
          onChange={password1.onChange}
          inputRef={password1.ref}
          name={password1.name}
          error={!!errors.password1}
          helperText={errors.password1 && errors.password1.message}
          variant='outlined'
          className={classes.formItem}
          size='small'
          type='password'
        />
        <TextField
          label='确认密码'
          margin='normal'
          fullWidth
          onChange={password2.onChange}
          inputRef={password2.ref}
          name={password2.name}
          error={!!errors.password2}
          helperText={errors.password2 && errors.password2.message}
          variant='outlined'
          className={classes.formItem}
          size='small'
          type='password'
        />
        <TextField
          label='邮箱'
          margin='normal'
          fullWidth
          onChange={email.onChange}
          inputRef={email.ref}
          name={email.name}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          variant='outlined'
          className={classes.formItem}
          size='small'
        />
        <Grid container>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='验证码'
              margin='normal'
              onChange={captcha.onChange}
              inputRef={captcha.ref}
              name={captcha.name}
              error={!!errors.captcha}
              helperText={errors.captcha && errors.captcha.message}
              variant='outlined'
              className={classes.formItem}
              size='small'
            />
          </Grid>
          <Grid item xs={6} container justifyContent='flex-end'>
            <Button
              className={classes.captchaBtn}
              onClick={clickGetCaptcha}
              disabled={!btnOpen}
              variant='contained'
              color='primary'
            >
              {btnOpen ? '获取验证码' : '验证码已发送'}
            </Button>
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          className={classes.formBtn}
          variant='contained'
          color='primary'
        >
          注册
        </Button>
      </form>

      <Link
        component={RouterLink}
        variant='body1'
        to='/signin'
        className={classes.link}
      >
        Already have an account? Sign In
      </Link>
    </>
  )
}

export default SignUpForm
