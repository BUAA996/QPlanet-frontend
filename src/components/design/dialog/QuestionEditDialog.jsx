import { DialogTitle, TextField, FormLabel, Select, RadioGroup, Radio, FormControlLabel, MenuItem, InputLabel, FormControl, DialogContent, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
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

  const [choices, setChoices] = useState([]);
  const [must, setMust] = useState("1");
  const [kind, setKind] = useState("0");
  const [title, setTitle] = useState("");


  useEffect(() => {
    setTitle(props.questionInfo.title)
    setChoices(props.questionInfo.choices)
    setMust("" + props.questionInfo.must);
    setKind("" + props.questionInfo.kind);
  }, [props.must, props.kind])

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
    setMust("" + props.questionInfo.must)
    setTitle(props.questionInfo.title)
    // console.log(props.questionInfo)
  }


  const saveFunc = () => {
    // console.log(choices)
    if (title.trim() === "") {
      enqueueSnackbar("题目不能为空", { variant: 'error' });
      return;
    }
    if ((kind == '0' || kind == '1') && choices.length < 2) {
      enqueueSnackbar("选择题选项不能少于两个", { variant: 'error' });
      return;
    }

    if ((kind == '0' || kind == '1') &&
      !choices
        .map((x) => x.trim() !== "")
        .reduce((x, y) => x && y)) {
      enqueueSnackbar("选项不能为空", { variant: 'error' });
      return;
    }


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
        helperText={title.trim() === "" && "题目不得为空"}
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