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

function SignUpSettings(props) {
  const classes = useStyle();
  const [limitTime, setLimitTime] = useState("1");

  const handleHasQuota = (event) => {
    const ori = JSON.parse(JSON.stringify(props.settings));
    ori.hasQuota = event.target.value;
    props.setSettings(ori)
  }
  const handleQuota = (event) => {
    const ori = JSON.parse(JSON.stringify(props.settings));
    ori.quota = event.target.value;
    props.setSettings(ori)
  }


  return (
    <Grid container
          direction="column">

      <Typography className={classes.title} variant="h6">报名问卷设置</Typography>
      <Grid
        item
        className={classes.choiceRow}>
        <FormControl component="fieldset">
          <FormLabel component="legend">答卷接受份数上限</FormLabel>
          <RadioGroup aria-label="限时" name="限时" value={props.settings.hasQuota} onChange={handleHasQuota} row="true">
            <FormControlLabel value="0" control={<Radio/>} label="不限制"/>
            <FormControlLabel value="1" control={<Radio/>} label={
              (<Input
                disabled={props.settings.hasQuota === "0"}
                id="filled-number"
                label="max response"
                type="number"
                shrink
                variant="filled"
                value={props.settings.quota}
                startAdornment={<InputAdornment position="start">至多</InputAdornment>}
                endAdornment={<InputAdornment position="end">份</InputAdornment>}
              />)}
            />
          </RadioGroup>
        </FormControl>
      </Grid>

    </Grid>
  );


}

export default SignUpSettings;