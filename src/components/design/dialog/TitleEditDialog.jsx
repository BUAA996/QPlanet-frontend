import {
  DialogTitle,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import EditDialog from "./EditDialog";
import DialogContent from "@material-ui/core/DialogContent";
import React from "react";
import ExamSettings from "./QuestionnaireSettings/ExamSettings";
import VoteSettings from "./QuestionnaireSettings/VoteSettings";
import SignUpSettings from "./QuestionnaireSettings/SignUpSettings";

const useStyle = makeStyles((theme) => ({
  grid: {
    margin: theme.spacing(1)
  }
}))


function TitleEditDialog(props) {
  const classes = useStyle();
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

      {/*todo: replace this with picker, currently not support by firefox */}
      <FormControl component="fieldset">
        <FormLabel component="legend">问卷填写截至时间</FormLabel>
        <RadioGroup aria-label="限时" name="限时" value={1} onChange={() => {
        }} row="true">
          <FormControlLabel value="0" control={<Radio/>} label="无"/>
          <FormControlLabel value="1" control={<Radio/>} label={
            (<TextField
              id="datetime-local"
              label="截止到"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              // className={classes.textField}
              shrink
            />)}
          />
        </RadioGroup>
      </FormControl>
      {otherSettings(props.type)}
    </DialogContent>
  );


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