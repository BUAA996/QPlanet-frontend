import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import banner from "assets/banner.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  banner: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "89vh",
    width: "99vw",
  },
}));

function Auth({ form }) {
  const classes = useStyles();

  return (
    <>
      <img src={banner} className={classes.banner} alt="banner" />;
      <Container className={classes.root} maxWidth="lg">
        {form}
      </Container>
    </>
  );
}

export default Auth;
