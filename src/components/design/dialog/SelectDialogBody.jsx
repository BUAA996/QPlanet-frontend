import {Delete, Title, CreateRounded} from "@material-ui/icons";
import {useForm} from "react-hook-form";
import {
  Typography,
  TextField,
  IconButton,
  Button,
  Grid,
  Dialog,
  DialogContent,
  Checkbox,
  FormControlLabel, FormControl, FormLabel, RadioGroup, Radio
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useState} from "react";

const useStyle = makeStyles(theme => ({
  row: {
    margin: theme.spacing(2)
  },
  rowButton: {
    marginLeft: theme.spacing(2)
  }
}))

// conponent: row of single choice
function SelectRow(props) {
  const classes = useStyle();

  return (
    <Grid container
          className={classes.row}>

      <Grid item>
        <TextField
          required
          label={"选项" + props.index}
          onChange={(e) => {
            props.editChoice(e.target.value, props.choiceContent.selected, props.choiceContent.limit)
          }}
          value={props.choiceContent.content}
          error={props.choiceContent.content.trim() === ""}
          helperText={props.choiceContent.content.trim() === "" && "选项不能为空"}
          variant="outlined"
          // fullWidth={true}
        />
      </Grid>

      {props.type === "EXAM" ?
        <Grid item
              className={classes.rowButton}>
          <FormControlLabel
            control={<Checkbox checked={props.choiceContent.selected} onChange={(event) => {
              props.editChoice(props.choiceContent.content, event.target.checked, props.choiceContent.limit)
            }}/>}
            label="设为答案"
          />
        </Grid> : null}


      {props.type === "SIGNUP" && props.hasLimit ?
        <Grid
          item
          className={classes.rowButton}
        >
          <TextField
            label="限额"
            value={props.choiceContent.limit}
            onChange={(event) => {
              props.editChoice(props.choiceContent.content, props.choiceContent.selected, event.target.value)
            }}
            error={isNaN(props.choiceContent.limit)
            || props.choiceContent.limit < 0
            || Math.ceil(props.choiceContent.limit) !== props.choiceContent.limit}
            helperText={(isNaN(props.choiceContent.limit) || props.choiceContent.limit < 0
              || Math.ceil(props.choiceContent.limit) !== props.choiceContent.limit) && "请输入正整数"}
            type="number"
            shrink
            fullWidth
          />
        </Grid> : null}


      <Grid item>
        <IconButton
          onClick={props.delChoice}>
          <Delete/>
        </IconButton>
      </Grid>
    </Grid>
  )

}


function SelectDialogBody(props) {
  const classes = useStyle();

  const editChoice = (index, content, select, limit) => {
    const newChoices = props.choices.slice()
    newChoices[index].content = content;
    newChoices[index].selected = select;
    newChoices[index].limit = limit;
    props.setChoices(newChoices);
  }

  const delChoice = (index) => {
    const newChoices = props.choices.slice()
    newChoices.splice(index, 1)
    props.setChoices(newChoices)
  }
  const addChoice = (content) => {
    const newChoice = props.choices.slice()
    newChoice.push({
      content: "请输入选项内容" + props.choices.length,
      selected: false,
      key: Math.random().toString(36).slice(-6),
      limit: 0
    })
    props.setChoices(newChoice)
  }

  return (
    <DialogContent>
      {props.type === "SIGNUP" ?
        <FormControl component="fieldset" className={classes.content}>
          <FormLabel component="legend"> 该题是否设置限额：</FormLabel>
          <RadioGroup
            aria-label="must?"
            onChange={(event) => {
              // console.log("aaa", props.hasLimit, event.target.value, event.target.value !== "1")
              props.setHasLimit(event.target.value === "1")
            }}
            value={props.hasLimit ? "1" : "0"}
            row
          >
            <FormControlLabel value={"1"} control={<Radio/>} label="是"/>
            <FormControlLabel value={"0"} control={<Radio/>} label="否"/>
          </RadioGroup>
        </FormControl> : null}


      {props.choices.map((item, idx) =>
        (<SelectRow
          key={item.key}
          choiceContent={item}
          index={idx}
          hasLimit={props.hasLimit}
          type={props.type}
          editChoice={(content, select, limit) => {
            editChoice(idx, content, select, limit)
          }}
          delChoice={() => delChoice(idx)}
        />)
      )
      }
      < Button
        className={classes.rowButton}
        onClick={addChoice}
        variant="outlined"
        startIcon={(<CreateRounded/>)}
      >
        插入新选项
      </Button>

    </DialogContent>
  )
}


export default SelectDialogBody;