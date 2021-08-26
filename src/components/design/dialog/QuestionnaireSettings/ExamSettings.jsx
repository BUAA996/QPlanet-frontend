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
  title:{
    margin:theme.spacing(1)
  }
}))

function ExamSettings(props) {
  const classes = useStyle();
  const [limitTime, setLimitTime] = useState("1");

  return (
    <Grid container
          direction="column">

      <Typography className={classes.title} variant="h6">考试设置</Typography>
      <Grid
        item
        className={classes.choiceRow}>
        <FormControl component="fieldset">
          <FormLabel component="legend">限时</FormLabel>
          <RadioGroup aria-label="限时" name="限时" value={limitTime} onChange={() => {
          }} row="true">
            <FormControlLabel value="0" control={<Radio/>} label="不限时"/>
            <FormControlLabel value="1" control={<Radio/>} label={
              (<Input
                id="filled-number"
                label="限时"
                type="number"
                shrink
                variant="filled"
                startAdornment={<InputAdornment position="start">限时</InputAdornment>}
                endAdornment={<InputAdornment position="end">分钟</InputAdornment>}
              />)}
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid
        item
        className={classes.choiceRow}>
        <FormControl component="fieldset">
          <FormLabel component="legend">多选题少选是否得分</FormLabel>
          <RadioGroup aria-label="多选题多选是否得分" name="multichoice-score" value={limitTime} onChange={() => {
          }} row={true}>
            <FormControlLabel value="0" control={<Radio/>} label="得分"/>
            <FormControlLabel value="1" control={<Radio/>} label="不得分"/>
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid
        item
        className={classes.choiceRow}>
        <FormControl component="fieldset">
          <FormLabel component="legend">填写时候顺序</FormLabel>
          <RadioGroup aria-label="多选题多选是否得分" name="multichoice-score" value={limitTime} onChange={() => {
          }} row={true}>
            <FormControlLabel value="0" control={<Radio/>} label="顺序"/>
            <FormControlLabel value="1" control={<Radio/>} label="随机打乱"/>
          </RadioGroup>
        </FormControl>
      </Grid>


      <Grid item
            className={classes.choiceRow}>
        <FormControl component="fieldset">
          <FormLabel component="legend">填写者提交后给出</FormLabel>
          <FormGroup row={true}>
            <FormControlLabel
              control={<Checkbox checked={1} onChange={() => {
              }} name="gilad"/>}
              label="答案"
            />
            <FormControlLabel
              control={<Checkbox checked={1} onChange={() => {
              }} name="jason"/>}
              label="自动评分结果"
            />
          </FormGroup>
          {/*<FormHelperText>Be careful</FormHelperText>*/}
        </FormControl>
      </Grid>

    </Grid>
  );


}

export default ExamSettings;