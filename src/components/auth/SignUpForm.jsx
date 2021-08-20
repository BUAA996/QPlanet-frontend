import { TextField, Button, Grid, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { getCaptcha, register as signUp } from "api/auth";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    alignSelf: "normal",
    width: "100%",
    fontWeight: "bolder",
    marginTop: theme.spacing(10),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  captchaBtn: {
    marginTop: "16px",
    height: "56px",
    width: "97%",
    borderRadius: theme.shape.borderRadius * 8,
  },
  formBtn: {
    borderRadius: theme.shape.borderRadius * 8,
    height: "50px",
    marginTop: theme.spacing(2),
  },
  link: {
    width: "100%",
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
}));

function SignUpForm() {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const [btnOpen, setBtnOpen] = useState(true);
  // const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const username = register("username", {
    required: { value: true, message: "用户名不能为空" },
  });
  const password = register("password", {
    required: { value: true, message: "密码不能为空" },
  });
  const email = register("email", {
    required: { value: true, message: "邮箱不能为空" },
    pattern: {
      value: /[a-z0-9]+@[a-z0-9]+(\.[a-z0-9]+)+/i,
      message: "请输入格式正确的邮箱",
    },
  });
  const captcha = register("captcha", {
    required: { value: true, message: "验证码不能为空" },
  });

  const onSubmit = (data) => {
    // signUp(data).then((res) => {
    //   if (res.data.success) {
    //     enqueueSnackbar(res.data.message, { variant: "success" });
    //     history.push("/signin");
    //   } else {
    //     enqueueSnackbar(res.data.message, { variant: "warning" });
    //   }
    // });
  };
  const clickGetCaptcha = () => {
    // let email = getValues("email");
    // if (/[a-z0-9]+@[a-z0-9]+(\.[a-z0-9]+)+/i.test(email)) {
    //   getCaptcha(email).then((res) => {
    //     if (res.data.message) {
    //       enqueueSnackbar(res.data.message, { variant: "success" });
    //       setBtnOpen(false);
    //     } else {
    //       enqueueSnackbar("验证码发送失败，请检查网络设置", {
    //         variant: "warning",
    //       });
    //     }
    //   });
    // } else {
    //   enqueueSnackbar("请正确输入获取验证码的邮箱", { variant: "warning" });
    // }
  };

  return (
    <>
      <Typography component="h1" variant="h4" className={classes.title}>
        注册
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          label="用户名"
          margin="normal"
          fullWidth
          onChange={username.onChange}
          inputRef={username.ref}
          name={username.name}
          error={!!errors.username}
          helperText={errors.username && errors.username.message}
          variant="outlined"
        />
        <TextField
          label="密码"
          margin="normal"
          fullWidth
          onChange={password.onChange}
          inputRef={password.ref}
          name={password.name}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
          variant="outlined"
        />
        <TextField
          label="邮箱"
          margin="normal"
          fullWidth
          onChange={email.onChange}
          inputRef={email.ref}
          name={email.name}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          variant="outlined"
        />
        <Grid container>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="验证码"
              margin="normal"
              onChange={captcha.onChange}
              inputRef={captcha.ref}
              name={captcha.name}
              error={!!errors.captcha}
              helperText={errors.captcha && errors.captcha.message}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <Button
              className={classes.captchaBtn}
              onClick={clickGetCaptcha}
              disabled={!btnOpen}
              variant="contained"
              size="large"
              color="primary"
            >
              {btnOpen ? "获取验证码" : "验证码已发送"}
            </Button>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          className={classes.formBtn}
          variant="contained"
          color="primary"
        >
          注册
        </Button>
      </form>
      
      {/* <Link
        component={RouterLink}
        variant="body1"
        to="/signin"
        className={classes.link}
      >
        Already have an account? Sign In
      </Link> */}

    </>
  );
}

export default SignUpForm;
