import {
  Checkbox,
  FormControl,
  FormControlLabel, FormGroup, FormHelperText,
  FormLabel, Grid, Input,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography
} from "@material-ui/core";
import {useState} from "react";

const {makeStyles} = require("@material-ui/core");

const useStyle = makeStyles((theme) => ({
  choiceRow: {
    margin: theme.spacing(1)
  },
  title: {
    margin: theme.spacing(1)
  }
}))

function VoteSettings(props) {
  const classes = useStyle();

  const handleBefore = (event) => {
    const ori = JSON.parse(JSON.stringify(props.settings));
    ori.displayBefore = event.target.checked;
    props.setSettings(ori)
  }

  const handleAfter = (event) => {
    const ori = JSON.parse(JSON.stringify(props.settings));
    ori.displayAfter = event.target.checked;
    props.setSettings(ori)
  }

  return (
    <Grid container
          direction="column">

      <Grid item
            className={classes.choiceRow}>
        <FormControl component="fieldset">
          <FormLabel component="legend">填写者可以在这些时候看到投票结果：</FormLabel>
          <FormGroup row={true}>
            <FormControlLabel
              control={<Checkbox checked={props.displayBefore} onChange={handleBefore} name="gilad"/>}
              label="作答前"
            />
            <FormControlLabel
              control={<Checkbox checked={props.displayAfter} onChange={handleAfter} name="jason"/>}
              label="提交后"
            />
          </FormGroup>
          {/*<FormHelperText>Be careful</FormHelperText>*/}
        </FormControl>
      </Grid>

    </Grid>
  );


}

export default VoteSettings;