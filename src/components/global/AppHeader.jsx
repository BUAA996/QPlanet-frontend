import { Button, AppBar, Toolbar, Box } from "@material-ui/core";
import { useDispatchStore } from "store";
import { useStateStore } from "store";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "10vh",
    lineHeight: "10vh",
    background: theme.palette.primary.main,
  },
  title: {
    height: "10vh",
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "3vh",
  },
  link: {
    height: "10vh",
    color: "white",
    marginRight: theme.spacing(2),
    fontSize: "1.8vh",
  },
}));

function AppHeader() {
  const classes = useStyles();
  const isLogin = useStateStore().isLogin;
  const dispatch = useDispatchStore();
  const history = useHistory();

  const showHeader = true;

  const logout = () => {
    dispatch({ type: "logout" });
    history.push("/signin");
  };

  return showHeader ? (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Link to="/" className={classes.title}>
          问卷星球
        </Link>
        <Box flexGrow={1} />
        {isLogin ? (
          <Button className={classes.link} onClick={logout}>
            登出
          </Button>
        ) : (
          <>
            <Button component={Link} to="/signin" className={classes.link}>
              登录
            </Button>
            <Button component={Link} to="/signup" className={classes.link}>
              注册
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  ) : (
    <Box height="10vh" width="100vw"></Box>
  );
}

export default AppHeader;
