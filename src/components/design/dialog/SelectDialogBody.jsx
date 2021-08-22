import { Delete, Title, CreateRounded } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { Typography, TextField, IconButton, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({

}))

function SelectRow(props) {
  const classes = useStyle();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    props.editChoice(data.choice)
  }

  const choiceContent = register("choice", {
    required: { value: true, message: "选项内容不能为空" }
  });

  return (
    <Grid container>

      <Grid item>
        {/* <form > */}
        <TextField
          required
          label={"选项" + props.index}
          defaultValue={props.choiceContent}
          onChange={choiceContent.onChange}
          name={choiceContent.name}
          inputRef={choiceContent.ref}
          error={!!errors.choiceContent}
          helperText={errors.choiceContent && errors.choiceContent.message}
          variant="outlined"
          onBlur={handleSubmit(onSubmit)}
        />
        {/* </form> */}
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
    <>
      <Typography>
        选项：
      </Typography>

      {props.choices.map((item, idx) =>
      (<SelectRow
        key={item} //!!!!!!!!!!!! bug: when same key
        choiceContent={item}
        index={idx}
        editChoice={(content) => { editChoice(idx, content) }}
        delChoice={() => delChoice(idx)}
      />)
      )
      }
      < Button
        onClick={addChoice}
        startIcon={(<CreateRounded />)}
      >
        插入新选项
      </Button>

    </>
  )
}


export default SelectDialogBody;