import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Completion from "components/feedback/Completion";
import Choice from "components/feedback/Choice";

const useStyles = makeStyles((theme) => ({}));

function Feedback() {
  const classes = useStyles();

  return <Container maxWidth="md"></Container>;
}

export default Feedback;
