import { Delete, Title, CreateRounded } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { Typography, TextField, IconButton, Button, Grid, Dialog, DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

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
  const [choice, setChoice] = useState("")

  useEffect(() => {
    setChoice(props.choiceContent);
  }, [props.choiceContent])

  const handleChange = (e) => {
    setChoice(e.target.value)
  }

  return (
    <Grid container
      className={classes.row}>

      <Grid item>
        <TextField
          required
          label={"选项" + props.index}
          onChange={handleChange}
          value={choice}
          error={choice.trim() === ""}
          helperText={choice.trim() === "" && "选项不能为空"}
          variant="outlined"
          // fullWidth={true}
          onBlur={() => props.editChoice(choice)}
        />
      </Grid>

      <Grid item>
        <IconButton onClick={props.delChoice}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  )

}


function SelectDialogBody(props) {
  const classes = useStyle();
  const { register,
    handleSubmit,
    formState: { errors } } = useForm();

  const editChoice = (index, content) => {
    const newChoices = props.choices.slice()
    newChoices[index] = content;
    props.setChoices(newChoices);
  }

  const delChoice = (index) => {
    const newChoices = props.choices.slice()
    newChoices.splice(index, 1)
    props.setChoices(newChoices)
  }
  const addChoice = (content) => {
    const newChoice = props.choices.slice()
    newChoice.push("请输入选项内容" + props.choices.length)
    props.setChoices(newChoice)
  }

  return (
    <DialogContent>

      {props.choices.map((item, idx) =>
      (<SelectRow
        key={idx} //!!!!!!!!!!!! bug: when same key
        choiceContent={item}
        index={idx}
        editChoice={(content) => { editChoice(idx, content) }}
        delChoice={() => delChoice(idx)}
      />)
      )
      }
      < Button
        className={classes.rowButton}
        onClick={addChoice}
        startIcon={(<CreateRounded />)}
      >
        插入新选项
      </Button>

    </DialogContent>
  )
}


export default SelectDialogBody;