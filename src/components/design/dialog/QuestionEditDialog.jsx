import { Box, DialogTitle, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Details, ErrorOutlineSharp } from "@material-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EditDialog from "./EditDialog";
import SelectDialogBody from "./SelectDialogBody";

const useStyle = makeStyles((theme) => ({

}))
// const example = {
//   id: 1,
//   kind: 0,
//   must: 1,
//   title: '第一题 balabalabalabala',
//   choices: [
//     '选项1',
//   ]
// }
function QuestionEditDialog(props) {
  const classes = useStyle();

  const [choices, setChoices] = useState(props.questionInfo.choices);

  const { register,
    handleSubmit,
    formState: { errors } } = useForm();


  const title = register("title", {
    required: { value: true, message: "题目标题不能为空" },
  });
  const must = register("must");

  const onSubmit = (data) => {
    const newQ = {
      id: props.questionInfo.id,
      kind: props.questionInfo.kind,
      must: data.must,
      title: data.title,
      choices: choices
    }
    props.edit(newQ)
  };

  const saveFunc = handleSubmit(onSubmit);

  const dialogTitle = (
    <DialogTitle>
      修改题目
    </DialogTitle>
  );
  const dialogContent = (
    <>
      <Box>
        <TextField
          required
          id="filled-required"
          label="题目"
          defaultValue={props.questionInfo.title}
          onChange={title.onChange}
          name={title.name}
          inputRef={title.ref}
          error={!!errors.title}
          helperText={errors.title && errors.title.message}
          multiline
          variant="outlined"
        />
      </Box>
      <Box>

        <FormControl component="fieldset">
          <FormLabel component="legend"> 是否必填：</FormLabel>
          <RadioGroup aria-label="must?"
            inputRef={must.ref}
            name={must.name}
            defaultValue={props.questionInfo.must}
            // onChange={must.onChange}
            onChange={(e) => {
              must.onChange(e); // will be called this time
            }}>

            <FormControlLabel value={true} control={<Radio />} label="是" />
            <FormControlLabel value={false} control={<Radio />} label="否" />
          </RadioGroup>
        </FormControl>
      </Box>
      {props.questionInfo.kind === 0 || props.questionInfo.kind === 1 ?
        <SelectDialogBody
          choices={choices}
          setChoices={setChoices}
        /> : null
      }

    </>

  );


  return (
    <EditDialog
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      open={props.open}
      close={props.close}
      save={saveFunc}
    />
  );
}

export default QuestionEditDialog;