import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    background: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2)
  },
  detail: {
    color: theme.palette.text.primary
  }
}));

function QHead(props) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <Typography component="h1" variant="h4" className={classes.title}>
        {props.title}
      </Typography>
      <Typography component="h5" variant="h6" className={classes.detail}>
        {props.detail}
      </Typography>
    </div>
  )
}
export default QHead;