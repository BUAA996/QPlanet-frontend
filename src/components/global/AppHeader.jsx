import {
  Button,
  AppBar,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Container,
  Grid,
} from '@material-ui/core'
import { useDispatchStore } from 'store'
import { useStateStore } from 'store'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { logout, getUserInfo } from 'api/auth'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import ChangePassword from 'components/utils/ChangePassword'
import { useEffect } from 'react'
import SvgLogo from 'assets/logo.svg'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontSize: 24,
    marginLeft: 5,
    textDecoration: 'none',
    color: 'white',
  },
  link: {
    height: '10vh',
    color: 'white',
    marginRight: theme.spacing(2),
    fontSize: 16,
  },
  // logo: { position: 'relative', top: -5, cursor: 'pointer' },
}))

function AppHeader() {
  const classes = useStyles()
  const isLogin = useStateStore().isLogin
  const dispatch = useDispatchStore()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({
    username: '用户',
    email: '无',
    count: 0,
  })

  useEffect(() => {
    if (isLogin) {
      getUserInfo().then((res) => {
        setUserInfo({
          username: res.data.username,
          email: res.data.email,
          count: res.data.count,
        })
      })
    }
  }, [isLogin])

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
    <>
      <AppBar position='fixed' className={classes.root}>
        <Toolbar>
          <Container fixed>
            <Grid
              container
              direction='row'
              justifyContent='flex-start'
              alignItems='center'
            >
              <Grid
                item
                xs={4}
                container
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
              >
                <Grid item>
                  <img
                    src={SvgLogo}
                    alt='logo'
                    onClick={() => {
                      history.push('/')
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </Grid>
                <Grid item>
                  <Link to='/' className={classes.title}>
                    问卷星球
                  </Link>
                </Grid>
              </Grid>
              <Grid
                item
                xs={8}
                container
                direction='row'
                justifyContent='flex-end'
                alignItems='center'
              >
                <Box flexGrow={1} />
                {isLogin ? (
                  <>
                    <Button
                      component={Link}
                      to='/overview'
                      className={classes.link}
                    >
                      进入控制台
                    </Button>
                    <Button
                      className={classes.link}
                      onClick={(event) => {
                        setAnchorEl(event.currentTarget)
                      }}
                    >
                      {userInfo.username}
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
                          setAnchorEl(null)
                        }}
                      >
                        修改密码
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          onLogout()
                          setAnchorEl(null)
                        }}
                      >
                        登出账号
                      </MenuItem>
                    </Menu>
                    <ChangePassword open={open} setOpen={setOpen} />
                  </>
                ) : (
                  <>
                    <Button
                      component={Link}
                      to='/signin'
                      className={classes.link}
                    >
                      登录
                    </Button>
                    <Button
                      component={Link}
                      to='/signup'
                      className={classes.link}
                    >
                      注册
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <div style={{ height: '10vh', width: '95vw' }} />
    </>
  ) : null
}

export default AppHeader
