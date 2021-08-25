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
import Preview from 'views/Preview'
import Finish from 'views/Finish'

function AppContent() {
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
          <Auth form={<SignInForm />} />
        </Route>
        <Route exact path='/signup'>
          <Auth form={<SignUpForm />} />
        </Route>
        <Route exact path='/design/:id'>
          <Design />
        </Route>
        <Route exact path='/preview/:id'>
          <Preview />
        </Route>
        <Route exact path='/feedback/:id'>
          <Feedback />
        </Route>
        <Route exact path='/overview'>
          <Overview />
        </Route>
        <Route exact path='/finish'>
          <Finish />
        </Route>
        <Route exact path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Box>
  )
}

export default AppContent
