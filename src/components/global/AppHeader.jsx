import { Button, AppBar, Toolbar, Box, Menu, MenuItem } from '@material-ui/core'
import { useDispatchStore } from 'store'
import { useStateStore } from 'store'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { logout } from 'api/auth'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import ChangePassword from 'components/utils/ChangePassword'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '10vh',
    lineHeight: '10vh',
    background: theme.palette.primary.main,
  },
  title: {
    height: '10vh',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '3vh',
  },
  link: {
    height: '10vh',
    color: 'white',
    marginRight: theme.spacing(2),
    fontSize: '1.8vh',
  },
}))

function AppHeader() {
  const classes = useStyles()
  const isLogin = useStateStore().isLogin
  const dispatch = useDispatchStore()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)

  const showHeader = true

  const onLogout = () => {
    logout().then((res) => {
      if (res.data.result) {
        dispatch({ type: 'logout' })
        enqueueSnackbar('退出账号成功', { variant: 'success' })
        history.push('/signin')
      } else {
        enqueueSnackbar(res.data.message, { variant: 'warning' })
      }
    })
  }

  return showHeader ? (
    <AppBar position='sticky' className={classes.root}>
      <Toolbar>
        <Link to='/' className={classes.title}>
          问卷星球
        </Link>
        <Box flexGrow={1} />
        {isLogin ? (
          <>
            <Button component={Link} to='/overview' className={classes.link}>
              进入控制台
            </Button>
            <Button
              className={classes.link}
              onClick={(event) => {
                setAnchorEl(event.currentTarget)
              }}
            >
              登出
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => {
                setAnchorEl(null)
              }}
            >
              <MenuItem
                onClick={() => {
                  setOpen(true)
                }}
              >
                修改密码
              </MenuItem>
              <MenuItem onClick={onLogout}>登出账号</MenuItem>
            </Menu>
            <ChangePassword open={open} setOpen={setOpen} />
          </>
        ) : (
          <>
            <Button component={Link} to='/signin' className={classes.link}>
              登录
            </Button>
            <Button component={Link} to='/signup' className={classes.link}>
              注册
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  ) : (
    <Box height='10vh' width='100vw'></Box>
  )
}

export default AppHeader
