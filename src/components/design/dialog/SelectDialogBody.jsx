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
  FormControlLabel
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

  useEffect(()=>{
    // console.log("aaa", props.choiceContent)
  })
  return (
    <Grid container
          className={classes.row}>

      <Grid item>
        <TextField
          required
          label={"选项" + props.index}
          onChange={(e) => {
            props.editChoice(e.target.value, props.choiceContent.selected)
          }}
          value={props.choiceContent.content}
          error={props.choiceContent.content.trim() === ""}
          helperText={props.choiceContent.content.trim() === "" && "选项不能为空"}
          variant="outlined"
          // fullWidth={true}
        />
      </Grid>


      <FormControlLabel
        control={<Checkbox checked={props.choiceContent.selected} onChange={(event) => {
          props.editChoice(props.choiceContent.content, event.target.checked)
        }}/>}
      label="答案"
      />

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

  const editChoice = (index, content, select) => {
    const newChoices = props.choices.slice()
    newChoices[index].content = content;
    newChoices[index].selected = select
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
      key: Math.random().toString(36).slice(-6)
    })
    props.setChoices(newChoice)
  }

  useEffect(()=>{
    // console.log("choice" , props.choices)
  })
  return (
    <DialogContent>

      {props.choices.map((item, idx) =>
        (<SelectRow
          key={item.key}
          choiceContent={item}
          index={idx}
          type={props.type}
          editChoice={(content, select) => {
            editChoice(idx, content, select)
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