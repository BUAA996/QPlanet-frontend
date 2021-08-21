import { makeStyles } from "@material-ui/core/styles";
import banner from "assets/banner.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "89vh",
    width: "99vw",
  },
}));

function Home() {
  const classes = useStyles();

  return <img src={banner} className={classes.root} alt="banner" />;
}

export default Home;
