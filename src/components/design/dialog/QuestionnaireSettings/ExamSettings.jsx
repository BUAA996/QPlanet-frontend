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

function ExamSettings(props) {
  const classes = useStyle();
  const a = 1;

  const handleDisplayAns = (event) => {
    const ori = JSON.parse(JSON.stringify(props.settings));
    ori.displayAns = event.target.checked;
    props.setSettings(ori)
  }

  const handleDisplayScore = (event) => {
    const ori = JSON.parse(JSON.stringify(props.settings));
    ori.displayScore = event.target.checked;
    props.setSettings(ori)
  }

  const handleRandomOrder = (event) => {
    const ori = JSON.parse(JSON.stringify(props.settings));
    ori.randomOrder = event.target.value;
    props.setSettings(ori)
  }

  return (
    <Grid container
          direction="column">

      <Typography className={classes.title} variant="h6">考试设置</Typography>

      <Grid
        item
        className={classes.choiceRow}>
        <FormControl component="fieldset">
          <FormLabel component="legend">多选题少选是否得分</FormLabel>
          <RadioGroup aria-label="多选题多选是否得分"
                      name="multichoice-score"
                      value={props.settings.selectLessScore? "0" : '1'}
                      onChange={(event) => {
                        const ori = JSON.parse(JSON.stringify(props.settings));
                        ori.selectLessScore = event.target.value === "0";
                        props.setSettings(ori)
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
          <RadioGroup aria-label="填写顺序"
                      value={props.settings.randomOrder ? "1" : "0"}
                      onChange={(event) => {
                        const ori = JSON.parse(JSON.stringify(props.settings));
                        ori.randomOrder = event.target.value === "1";
                        props.setSettings(ori)
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
              control={<Checkbox checked={props.settings.displayAns} onChange={handleDisplayAns} name="gilad"/>}
              label="答案"
            />
            <FormControlLabel
              control={<Checkbox checked={props.settings.displayScore} onChange={handleDisplayScore} name="jason"/>}
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