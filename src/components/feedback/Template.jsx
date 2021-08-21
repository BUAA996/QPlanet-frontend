import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
const useStyles = makeStyles((theme) => ({}));

function Template({ title, type, children }) {
  const classes = useStyles();

  return (
    <Card>
      <Typography>{title}</Typography>
      <Typography>{type}</Typography>
      {children}
    </Card>
  );
}

Template.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Template;
