import { useEffect } from "react";
import { useState } from "react";

const { makeStyles, IconButton, Grid, Box, TextField, Button } = require("@material-ui/core");
const { ArrowDropUpRounded, ArrowDropDownRounded, DehazeRounded } = require("@material-ui/icons");
const { default: ProblemEdit } = require("./ProblemEdit");

const useStyle = makeStyles(theme => ({
  inputNum: {
    width: theme.spacing(5)
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
  const moveDown = () => { props.move(props.index + 1) }

  return (
    <Grid container
      direction="row"
      alignItems="center"
      justifyContent="space-around"
    >
      <Grid container item
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        xs={4}>
        <Grid item >
          <Button
            variant="outlined"
            startIcon={(<ArrowDropUpRounded />)}
            onClick={moveUp}>
            题目上移
          </Button>
        </Grid>
        {/*         
        <Grid item>
          <DehazeRounded />
        </Grid> */}

        <Grid item>
          <Button
            onClick={moveDown}
            variant="outlined"
            startIcon={<ArrowDropDownRounded />}>
            题目下移
          </Button>
        </Grid>

        {/* <Grid item>
          <Box className={classes.inputNum}>
            <TextField
              id="题号"
              label="题号"
              type="number"
              size="small"
              value={to + 1}
            />
          </Box>
        </Grid> */}

      </Grid>


      <Grid item xs={8}>
        <ProblemEdit
          content={props.question}
          del={props.del}
          add={props.add}
          edit={props.edit}
          questionInfo={props.questionInfo}
          index={props.index}
        />
      </Grid>
    </Grid>
  );
}

export default MovableProblemEdit;