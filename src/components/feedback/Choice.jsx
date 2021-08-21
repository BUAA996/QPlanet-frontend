import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Template from "./Template";

const useStyles = makeStyles((theme) => ({}));

function Choice({ title, type, choice, count }) {
  const classes = useStyles();

  return (
    <Template title={title} type={type}>
      haha
    </Template>
  );
}

Choice.propTypes = {
  choice: PropTypes.arrayOf(PropTypes.string),
  count: PropTypes.arrayOf(PropTypes.number),
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Choice;
