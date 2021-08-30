import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  Box,
  DialogActions,
  IconButton,
  DialogContent,
  TextField,
  Button,
  Grid,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { changePassword } from 'api/auth'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  closeBtn: {
    position: 'absolute',
    right: theme.spacing(1),
  },
  form: {
    width: '70%',
  },
  formBox: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1.5),
  },
  btn: {},
}))

function ChangePassword({ open, setOpen }) {
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const { enqueueSnackbar } = useSnackbar()

  const password1 = register('password1', {
    required: { value: true, message: '新密码不能为空' },
    minLength: { value: 6, message: '密码最少需要6个字符' },
    maxLength: { value: 16, message: '密码最多只能有16个字符' },
  })
  const password2 = register('password2', {
    required: { value: true, message: '确认密码不能为空' },
  })

  const onSubmit = (data) => {
    if (data.password1 !== data.password2) {
      enqueueSnackbar('两次输入的密码不一致', { variant: 'warning' })
    } else {
      changePassword(data)
      enqueueSnackbar('修改密码成功', { variant: 'success' })
      setOpen(false)
      reset({ password1: '', password2: '' })
    }
  }

  return (
    <Dialog open={open} maxWidth='sm'>
      <Box
        display='flex'
        justifyContent='center'
        width={600}
        position='relative'
      >
        <DialogTitle>修改密码</DialogTitle>
        <DialogActions className={classes.closeBtn}>
          <IconButton
            onClick={() => {
              setOpen(false)
              reset({ password1: '', password2: '' })
            }}
          >
            <Close />
          </IconButton>
        </DialogActions>
      </Box>
      <DialogContent className={classes.formBox}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TextField
            label='新密码'
            margin='normal'
            fullWidth
            onChange={password1.onChange}
            inputRef={password1.ref}
            name={password1.name}
            error={!!errors.password1}
            helperText={errors.password1 && errors.password1.message}
            variant='outlined'
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
            type='password'
          />
          <Box
            display='flex'
            justifyContent='center'
            width='100%'
            marginTop={1.6}
            marginBottom={2.5}
          >
            <Grid container spacing={1} justifyContent='space-between'>
              <Grid item xs={6}>
                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                  color='primary'
                  size='large'
                >
                  确认
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  size='large'
                  fullWidth
                  onClick={() => {
                    setOpen(false)
                    reset({ password1: '', password2: '' })
                  }}
                  variant='contained'
                  color='primary'
                >
                  取消
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePassword
