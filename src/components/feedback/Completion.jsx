import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Template from "./Template";

const useStyles = makeStyles((theme) => ({}));

function Completion({ data }) {
  const classes = useStyles();

  return (
    <Template title={data.title} type={data.type}>
      hahahah
    </Template>
  );
}

Completion.propTypes = {
  props: PropTypes.shape({
    choice: PropTypes.arrayOf(PropTypes.string),
    count: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default Completion;
