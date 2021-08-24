import { Box, DialogTitle, TextField, FormLabel, Select, RadioGroup, Radio, FormControlLabel, MenuItem, InputLabel, FormControl, DialogContent, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Details, ErrorOutlineSharp } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EditDialog from "./EditDialog";
import SelectDialogBody from "./SelectDialogBody";

const useStyle = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
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
  const [must, setMust] = useState("" + props.questionInfo.must);
  const [kind, setKind] = useState("" + props.questionInfo.kind)

  const handleChangeMust = (event) => {
    setMust(event.target.value);
  };
  const handleChangeKind = (event) => {
    setKind(event.target.value);
  }

  const { register,
    handleSubmit,
    formState: { errors } } = useForm();


  const title = register("title", {
    required: { value: true, message: "题目标题不能为空" },
  });

  useEffect(() => {
    if (!Boolean(choices)) {
      setChoices([]);
    }
  }, [])

  const onSubmit = (data) => {
    const newQ = {
      id: props.questionInfo.id,
      description: "",
      kind: parseInt(kind),
      must: must === "1" ? 1 : 0,
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
    <DialogContent>
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
        fullWidth
      />
      <FormControl component="fieldset" className={classes.content}>
        <FormLabel component="legend"> 是否必填：</FormLabel>
        <RadioGroup aria-label="must?"
          onChange={handleChangeMust}
          value={must}
          row
        >
          <FormControlLabel value={"1"} control={<Radio />} label="是" />
          <FormControlLabel value={"0"} control={<Radio />} label="否" />
        </RadioGroup>
      </FormControl>


      <InputLabel id="demo-simple-select-label" >题目类型</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={kind}
        onChange={handleChangeKind}
        className={classes.content}
      >
        <MenuItem value={0}>单选</MenuItem>
        <MenuItem value={1}>多选</MenuItem>
        <MenuItem value={2}>填空</MenuItem>
        <MenuItem value={3}>简答</MenuItem>
      </Select>
      {kind == '0' || kind == '1' ?
        <SelectDialogBody
          choices={choices}
          setChoices={setChoices}
        /> : null
      }

    </DialogContent>

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