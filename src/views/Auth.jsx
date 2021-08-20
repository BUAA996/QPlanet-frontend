import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Auth({ form }) {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="lg">
      {form}
    </Container>
  );
}

export default Auth; 
