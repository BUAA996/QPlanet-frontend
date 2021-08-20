import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "views/Auth";
import Home from "views/Home";
import NotFound from "views/NotFound";
import Overview from "views/Overview";
import Feedback from "views/Feedback";
import Design from "views/Design";
import { Box } from "@material-ui/core";
import SignInForm from "components/auth/SignInForm";
import SignUpForm from "components/auth/SignUpForm";
import { useStateStore } from "store";

function AppContent() {
  const isLogin = useStateStore().isLogin;

  return (
    <Box component="main" height="85vh" width="100%" position="relative">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signin">
          {isLogin ? <Redirect to="/" /> : <Auth form={<SignInForm />} />}
        </Route>
        <Route exact path="/signup">
          <Auth form={<SignUpForm />} />
        </Route>
        <Route exact path="/design">
          <Design />
        </Route>
        <Route exact path="/feedback/:id">
          <Feedback />
        </Route>
        <Route exact path="/overview/:id">
          <Overview />
        </Route>
        <Route exact path="*">
          <Auth form={<NotFound />} />
        </Route>
      </Switch>
    </Box>
  );
}

export default AppContent;
