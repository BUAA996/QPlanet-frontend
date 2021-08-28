import {useEffect} from "react";
import {useState} from "react";

const {makeStyles, IconButton, Grid, Box, TextField, Button} = require("@material-ui/core");
const {ExpandLessRounded, ExpandMoreRounded, DehazeRounded} = require("@material-ui/icons");
const {default: ProblemEdit} = require("./ProblemEdit");

const useStyle = makeStyles(theme => ({
  inputNum: {
    width: theme.spacing(7),
    margin: theme.spacing(2)
  },
  moveButton: {
    margin: theme.spacing(1)
  }
}))

function MovableProblemEdit(props) {
  const classes = useStyle();
  const [to, setTo] = useState(props.index);
  useEffect(() => {
    setTo(props.index)
  })

  const moveUp = () => {
    if (props.index > 0)
      props.move(props.index - 1)
  }
  const moveDown = () => {
    props.move(props.index + 1)
  }

  return (
    <Grid container
          direction="row"
          alignItems="center"
          justifyContent="space-around"
    >
      <Grid container item
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            xs={5}>
        <Grid item>
          <Button
            className={classes.moveButton}
            variant="outlined"
            startIcon={(<ExpandLessRounded/>)}
            onClick={moveUp}>
            题目上移
          </Button>
        </Grid>

        <Grid item>
          <Button
            className={classes.moveButton}
            onClick={moveDown}
            variant="outlined"
            startIcon={<ExpandMoreRounded/>}>
            题目下移
          </Button>
        </Grid>

      </Grid>

      <Grid item xs={7}>
        <ProblemEdit
          content={props.question}
          type={props.type}
          settings={props.settings}
          del={props.del}
          add={props.add}
          addDefault={props.addDefault}
          edit={props.edit}
          questionInfo={props.questionInfo}
          index={props.index}
        />
      </Grid>
    </Grid>
  );
}

export default MovableProblemEdit;