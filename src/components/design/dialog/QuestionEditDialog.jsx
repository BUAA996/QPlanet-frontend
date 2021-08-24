import { Box, DialogTitle, TextField, FormLabel, Select, RadioGroup, Radio, FormControlLabel, MenuItem, InputLabel, FormControl, DialogContent, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Details, ErrorOutlineSharp } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EditDialog from "./EditDialog";
import SelectDialogBody from "./SelectDialogBody";
import { useSnackbar } from 'notistack'

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
  const { enqueueSnackbar } = useSnackbar()

  const [choices, setChoices] = useState(props.questionInfo.choices);
  const [must, setMust] = useState("" + props.questionInfo.must);
  const [kind, setKind] = useState("" + props.questionInfo.kind);
  const [title, setTitle] = useState("" + props.questionInfo.title);

  const handleChangeMust = (event) => {
    setMust(event.target.value);
  };
  const handleChangeKind = (event) => {
    setKind(event.target.value);
  }
  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }


  useEffect(() => {
    if (!Boolean(choices)) {
      setChoices([]);
    }
  }, [])


  const handleClose = () => {
    props.close()
    setChoices(props.questionInfo.choices)
    setMust(props.questionInfo.must)
    setTitle(props.questionInfo.title)
    console.log(props.questionInfo)
  }


  const saveFunc = () => {
    if (title.trim() === "") {
      enqueueSnackbar("题目不能为空", { variant: 'error' });
      return;
    }
    if ((kind == '0' || kind == '1') && choices.length < 2) {
      enqueueSnackbar("选择题选项不能少于两个", { variant: 'error' });
      return;
    }
    // if ((kind == '0' || kind == '1') && )


      const newQ = {
        id: props.questionInfo.id,
        description: "",
        kind: parseInt(kind),
        must: must === "1" ? 1 : 0,
        title: title.trim(),
        choices: choices
      }
    props.edit(newQ)
    props.close()
  }

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
        value={title}
        onChange={handleChangeTitle}
        error={title.trim() === ""}
        helperText="题目不得为空"
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
      close={handleClose}
      save={saveFunc}
    />
  );
}

export default QuestionEditDialog;