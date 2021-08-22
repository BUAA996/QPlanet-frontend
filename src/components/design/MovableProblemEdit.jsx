import { useEffect } from "react";
import { useState } from "react";

const { makeStyles, Button, IconButton, Grid, Box, TextField } = require("@material-ui/core");
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
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        xs="1">
        <Grid item >
          <IconButton
            onClick={moveUp}>
            <ArrowDropUpRounded
              fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item>
          <DehazeRounded />
        </Grid>

        <Grid item>
          <IconButton
            onClick={moveDown}>
            <ArrowDropDownRounded
              fontSize="large" />
          </IconButton>
        </Grid>

        <Grid item>
          <Box className={classes.inputNum}>
            <TextField
              id="题号"
              label="题号"
              type="number"
              size="small"
              value={to + 1}
              shrink
            />
          </Box>
        </Grid>

      </Grid>


      <Grid item xs="11">
        <ProblemEdit
          content={props.question}
        />
      </Grid>
    </Grid>
  );
}

export default MovableProblemEdit;