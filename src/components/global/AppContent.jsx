import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "views/Auth";
import { Box } from "@material-ui/core";
import SignInForm from "components/auth/SignInForm";
import SignUpForm from "components/auth/SignUpForm";
import NotFound  from "views/NotFound";
// import { useStateStore } from "store";

function AppContent() {
  // const isLogin = useStateStore().isLogin;
  const isLogin = false;

  return (
    <Box component="main" height="85vh" width="100%">
      <Switch>
        <Route exact path="/signin">
          {isLogin ? <Redirect to="/" /> : <Auth form={<SignInForm />} />}
        </Route>
        <Route exact path="/signup">
          <Auth form={<SignUpForm />} />
        </Route>
        <Route exact path="*">
          <Auth form={<NotFound />} />
        </Route>
      </Switch>
    </Box>
  );
}

export default AppContent;
 