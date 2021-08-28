import {
  DialogTitle,
  TextField,
  FormLabel,
  Select,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
  InputLabel,
  FormControl,
  DialogContent
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useState} from "react";
import EditDialog from "./EditDialog";
import SelectDialogBody from "./SelectDialogBody";
import {useSnackbar} from 'notistack'

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
  const {enqueueSnackbar} = useSnackbar()

  const [choices, setChoices] = useState([]);
  const [must, setMust] = useState("1");
  const [kind, setKind] = useState("0");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(0);
  const [closeId, setCloseId] = useState(0);
  // let index = 1; // add when close
  useEffect(() => {
    setTitle(props.questionInfo.title)
    setChoices(props.questionInfo.choices.map((x, index) => ({content: x, selected: false, key: index})))
    setMust("" + props.questionInfo.must);
    setKind("" + props.questionInfo.kind);
    setDescription("" + props.questionInfo.description);
    setScore(props.questionInfo.standardAnswer.score ?? 0)

    if (props.type === "EXAM" && (kind == "0" || kind == "1")) { // edit choice for right answer

      props.questionInfo.standardAnswer.content.forEach((x) => {
        const newChoice = choices.slice();
        newChoice[x].selected = true;
        setChoices(newChoice)
      })

    }
  }, [props.questionInfo, closeId])

  const handleChangeMust = (event) => {
    setMust(event.target.value);
  };
  const handleChangeKind = (event) => {
    setKind(event.target.value);
  }
  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeDescription = (event) => {
    setDescription(event.target.value)
  }
  const handleChangeScore = (event) => {
    setScore(event.target.value)
  }

  useEffect(() => {
    if (!Boolean(choices)) {
      setChoices([]);
    }
  }, [])


  const handleClose = () => {
    props.close()
    setCloseId(closeId + 1)
  }


  const saveFunc = () => {
    if (title.trim() === "") {
      enqueueSnackbar("题目不能为空", {variant: 'error'});
      return;
    }
    if ((kind == '0' || kind == '1') && choices.length < 1) {
      enqueueSnackbar("选择题选项没有选项", {variant: 'error'});
      return;
    }

    if ((kind == '0' || kind == '1') &&
      !choices
        .map((x) => x.content.trim() !== "")
        .reduce((x, y) => x && y)) {
      enqueueSnackbar("选择题选项不能为空", {variant: 'error'});
      return;
    }

    const newQ = {
      id: props.questionInfo.id,
      description: description,
      kind: parseInt(kind),
      must: must === "1" ? 1 : 0,
      title: title.trim(),
      choices: choices.map((x) => x.content.trim()),
      standardAnswer: {
        score: score,
        content: choices.map((x) => x.selected).reduce((pre, cur, index) => {
          const newArray = pre.slice();
          if (cur) newArray.push(index)
          return newArray
        }, [])
      }
    }

    props.edit(newQ)
    props.close()
  }

  const dialogTitle = (
    <DialogTitle>
      编辑题目
    </DialogTitle>
  );
  const dialogContent = (
    <DialogContent>
      <TextField
        required
        id="filled-required"
        label="题目"
        value={title}
        onChange={handleChangeTitle}
        error={title.trim() === ""}
        helperText={title.trim() === "" && "题目不得为空"}
        multiline
        fullWidth
      />
      <TextField
        label="描述"
        value={description}
        onChange={handleChangeDescription}
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
          <FormControlLabel value={"1"} control={<Radio/>} label="是"/>
          <FormControlLabel value={"0"} control={<Radio/>} label="否"/>
        </RadioGroup>
      </FormControl>


      <InputLabel id="demo-simple-select-label">题目类型</InputLabel>
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
        <MenuItem value={4}>评分</MenuItem>
        <MenuItem value={5}>定位</MenuItem>
      </Select>


      {props.type === "EXAM" ?
        <TextField
          label="题目分值"
          value={score}
          type="number"
          onChange={handleChangeScore}
          multiline
          fullWidth
        /> : null
      }


      {kind == '0' || kind == '1' ?
        <SelectDialogBody
          choices={choices}
          setChoices={setChoices}
          type={props.type}
          settings={props.settings}
        /> : null
      }


    </DialogContent>

  );


  return (
    <EditDialog
      dialogTitle={dialogTitle}
      type={props.type}
      settings={props.settings}
      dialogContent={dialogContent}
      open={props.open}
      close={handleClose}
      save={saveFunc}
    />
  );
}

export default QuestionEditDialog;