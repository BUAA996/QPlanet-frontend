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
        <Route exact path='/preview/:id'>
          <Preview />
        </Route>
        <Route exact path='/signin'>
          {isLogin ? <Redirect to='/' /> : <Auth form={<SignInForm />} />}
        </Route>
        <Route exact path='/signup'>
          {isLogin ? <Redirect to='/' /> : <Auth form={<SignUpForm />} />}
        </Route>
        <Route exact path='/design/:id'>
          {isLogin ? <Design /> : <Redirect to='/signin' />}
        </Route>
        <Route exact path='/preview/:id'>
          {isLogin ? <Preview /> : <Redirect to='/signin' />}
        </Route>
        <Route exact path='/feedback/:id'>
          {isLogin ? <Feedback /> : <Redirect to='/signin' />}
        </Route>
        <Route exact path='/overview'>
          {isLogin ? <Overview /> : <Redirect to='/signin' />}
        </Route>
        <Route exact path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Box>
  )
}

export default AppContent
