import {
  DialogTitle,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl, Grid
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import EditDialog from "./EditDialog";
import DialogContent from "@material-ui/core/DialogContent";
import React, {useEffect, useState} from "react";
import ExamSettings from "./QuestionnaireSettings/ExamSettings";
import VoteSettings from "./QuestionnaireSettings/VoteSettings";
import SignUpSettings from "./QuestionnaireSettings/SignUpSettings";
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {ScheduleRounded} from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  grid: {
    marginBottom: theme.spacing(1)
  }
}))


function TitleEditDialog(props) {
  const classes = useStyle();
  const [selectedDate, handleDateChange] = useState(new Date());
  const otherSettings = (type) => {
    switch (type) {
      // case "NORMAL":
      //   return null;
      case "VOTE":
        return <VoteSettings settings={props.settings} setSettings={props.setSettings}/>
      case "SIGNUP":
        return <SignUpSettings settings={props.settings} setSettings={props.setSettings}/>
      case "EXAM":
        return <ExamSettings settings={props.settings} setSettings={props.setSettings}/>
      default:
        return null;
    }
  }


  const dialogTitle = (
    <DialogTitle>
      全局设置
    </DialogTitle>
  );

  const dialogContent = (
      <DialogContent>
        <Grid container direction="column">
          <Grid item className={classes.grid}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="标题"
              type="text"
              value={props.title || ''}
              error={props.title === ""}
              onChange={props.handleTitleChange}
              helperText={"为了更好的呈现效果，请把标题控制在 20 个字以内"}
              fullWidth
            />
          </Grid>
          <Grid item className={classes.grid}>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="简介"
              type="text"
              multiline
              value={props.description || ''}
              onChange={props.handleDescriptionChange}
              fullWidth
            />
          </Grid>
          <Grid item className={classes.grid}>
            <FormControl component="fieldset">
              <FormLabel component="legend">问卷填写截至时间</FormLabel>
              <RadioGroup aria-label="限时" name="限时" value={props.settings.hasDdl ? "1" : "0"}
                          onChange={(event) => {
                            const ori = JSON.parse(JSON.stringify(props.settings));
                            ori.hasDdl = event.target.value === "1";
                            props.setSettings(ori)
                          }} row="true">
                <FormControlLabel value="0" control={<Radio/>} label="无"/>
                <FormControlLabel value="1" control={<Radio/>} label={
                  (<MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        keyboardIcon={<ScheduleRounded/>}
                        label="截止日期"
                        margin="normal"
                        format="yyyy/MM/dd hh:mm"
                        ampm={false}
                        disablePast
                        value={props.settings.deadline}
                        onChange={(time) => {
                          const ori = JSON.parse(JSON.stringify(props.settings));
                          const data = "" + time.getFullYear() + "-" +
                            (time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : "0" + (time.getMonth() + 1))
                            + "-" + (time.getDate() >= 10 ? time.getDate() : "0" + time.getDate())
                            + " " + (time.getHours() >= 10 ? time.getHours() : "0" + time.getHours())
                            + ":" + (time.getMinutes()>=10? time.getMinutes(): "0" + time.getMinutes());
                          ori.deadline = data.substr(0, 10) + ' ' + data.substr(11, 5);
                          props.setSettings(ori)
                        }}/>
                    </MuiPickersUtilsProvider>
                  )}
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item className={classes.grid}>
            <FormControl component="fieldset">
              <FormLabel component="legend">答题者需要认证</FormLabel>
              <RadioGroup
                aria-label="认证"
                value={props.settings.certification ? props.settings.certification.toString() : "0"}
                onChange={(event) => {
                  const ori = JSON.parse(JSON.stringify(props.settings));
                  ori.certification = parseInt(event.target.value);
                  props.setSettings(ori)
                }}>
                <FormControlLabel value="0" control={<Radio/>} label="无"/>
                <FormControlLabel value="1" control={<Radio/>} label="登陆"/>
                <FormControlLabel value="2" control={<Radio/>} label="手机号验证（发布者不可见）"/>
                <FormControlLabel value="3" control={<Radio/>} label="手机号验证（发布者可见）"/>

              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item className={classes.grid}>
            <FormControl component="fieldset">
              <FormLabel component="legend">是否显示题号</FormLabel>
              <RadioGroup aria-label="是否显示题号" value={props.settings.showIdx ? "0" : "1"}
                          onChange={(event) => {
                            const ori = JSON.parse(JSON.stringify(props.settings));
                            ori.showIdx = event.target.value === "0";
                            props.setSettings(ori)
                          }} row={true}>
                <FormControlLabel value="0" control={<Radio/>} label="显示题号"/>
                <FormControlLabel value="1" control={<Radio/>} label="不显示"/>
              </RadioGroup>
            </FormControl>
          </Grid>


          {
            otherSettings(props.type)
          }
        </Grid>
      </DialogContent>
    )
  ;


  return (
    <EditDialog
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      open={props.open}
      close={props.close}
      save={props.handleModify}
    />
  );
}

export default TitleEditDialog;