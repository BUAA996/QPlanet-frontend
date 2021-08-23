import { Route, Switch, Redirect } from 'react-router-dom'
import Auth from 'views/Auth'
import Home from 'views/Home'
import NotFound from 'views/NotFound'
import Overview from 'views/Overview'
import Feedback from 'views/Feedback'
import Fill from 'views/Fill'
import Design from 'views/Design'
import { Box } from '@material-ui/core'
import SignInForm from 'components/auth/SignInForm'
import SignUpForm from 'components/auth/SignUpForm'
import { useStateStore } from 'store'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import Preview from 'views/Preview'

function RedirectWithMsg({ prevent, to, message, type, component }) {
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    enqueueSnackbar(message, { variant: type })
    setLoading(false)
  }, [enqueueSnackbar, type, message])

  return <>{loading ? component : <Redirect to={to} />}</>
}

RedirectWithMsg.defaultProps = {
  component: <div></div>,
}

function AppContent() {
  const isLogin = useStateStore().isLogin

  return (
    <Box component='main' height='85vh' width='100%' position='relative'>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/fill/:id'>
          <Fill />
        </Route>
        <Route exact path='/signin'>
          {isLogin ? (
            <RedirectWithMsg
              to='/'
              message='您已登录，无需重复登录'
              type='warning'
            />
          ) : (
            <Auth form={<SignInForm />} />
          )}
        </Route>
        <Route exact path='/signup'>
          {isLogin ? (
            <RedirectWithMsg
              to='/'
              message='您已登录，请先退出账号再注册新账号'
              type='warning'
            />
          ) : (
            <Auth form={<SignUpForm />} />
          )}
        </Route>
        <Route exact path='/design'>
          {isLogin ? (
            <Design />
          ) : (
            <RedirectWithMsg
              to='/signin'
              message='未登录时该功能不能使用'
              type='warning'
            />
          )}
        </Route>
        <Route exact path='/preview/:id'>
          {isLogin ? (
            <Preview />
          ) : (
            <RedirectWithMsg
              to='/signin'
              message='未登录时该功能不能使用'
              type='warning'
            />
          )}
        </Route>
        <Route exact path='/feedback/:id'>
          {isLogin ? (
            <Feedback />
          ) : (
            <RedirectWithMsg
              to='/signin'
              message='未登录时该功能不能使用'
              type='warning'
            />
          )}
        </Route>
        <Route exact path='/overview'>
          {isLogin ? (
            <Overview />
          ) : (
            <RedirectWithMsg
              to='/signin'
              message='未登录时该功能不能使用'
              type='warning'
            />
          )}
        </Route>
        <Route exact path='*'>
          <Auth form={<NotFound />} />
        </Route>
      </Switch>
    </Box>
  )
}

export default AppContent
