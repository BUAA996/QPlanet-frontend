import { makeStyles } from "@material-ui/core/styles";
import banner from "assets/banner.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    width: "100vw",
  },
}));

function Home() {
  const classes = useStyles();

  return <img src={banner} className={classes.root} />;
}

export default Home;
