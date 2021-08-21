import { Button, AppBar, Toolbar, Box } from "@material-ui/core";
import { useDispatchStore } from "store";
import { useStateStore } from "store";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { logout } from "api/auth";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();

  const showHeader = true;

  const onLogout = () => {
    logout().then((res) => {
      if (res.data.result) {
        dispatch({ type: "logout" });
        enqueueSnackbar("退出账号成功", { variant: "success" });
        history.push("/signin");
      } else {
        enqueueSnackbar(res.data.message, { variant: "warning" });
      }
    });
  };

  return showHeader ? (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Link to="/" className={classes.title}>
          问卷星球
        </Link>
        <Box flexGrow={1} />
        {isLogin ? (
          <Button className={classes.link} onClick={onLogout}>
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
