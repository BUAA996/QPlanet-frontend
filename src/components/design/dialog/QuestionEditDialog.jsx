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
  DialogContent, Grid
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
  },
  scoreLine: {
    width: "30%"
  },
  grid: {
    marginBottom: theme.spacing(1),
  }
}))

function QuestionEditDialog(props) {
  const classes = useStyle();
  const {enqueueSnackbar} = useSnackbar()

  const [choices, setChoices] = useState([]);
  const [must, setMust] = useState("1");
  const [kind, setKind] = useState("0");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(0);
  const [closeId, setCloseId] = useState(0); // add to update
  const [fillAns, setFillAns] = useState("")
  const [hasLimit, setHasLimit] = useState(false);
  const [element, setElement] = useState(false); // for EXAM

  useEffect(() => {
      console.log("questionInfo", props.questionInfo)
      setTitle(props.questionInfo.title)
      setChoices(props.questionInfo.choices.map((x, index) => ({
        content: x,
        selected: false,
        key: index,
        limit: 0,
      })))

      setMust("" + props.questionInfo.must);
      setKind("" + props.questionInfo.kind);
      setDescription("" + props.questionInfo.description);
      setScore(props.questionInfo.standardAnswer.score ?? 0)
      setFillAns(props.questionInfo.standardAnswer.content.join(';'))
      setHasLimit(!props.questionInfo.isElement)
      setElement(props.questionInfo.isElement)


      if (props.type === "EXAM" && (kind == "0" || kind == "1")) { // edit choice for right answer
        props.questionInfo.standardAnswer.content.forEach((x) => {
          if (isNaN(x)) return;
          const newChoice = choices.slice();
          newChoice[x].selected = true;
          setChoices(newChoice)
        })
      }
      if (props.type === "SIGNUP" && (kind == "0" || kind == "1")) { // edit choice for right answer
        console.log("quota", props.questionInfo.quota)
        console.log("choice", choices)
        props.questionInfo.quota.map((x, index) => {
          const newChoice = choices.slice();
          if (isNaN(x) || newChoice[index] === undefined) return;
          newChoice[index].limit = x
          setChoices(newChoice)
        })
      }
    },
    [props.type, kind, props.questionInfo, props.questionInfo.standardAnswer.content, closeId]
  )


  const handleChangeKind = (event) => {
    // TODO: I believe there is a bug when change question type
    setKind(event.target.value);
    if (((kind == '0' || kind == '1') && (props.questionInfo.kind != '0' && props.questionInfo.kind != '1'))
      || ((kind != '0' && kind != '1') && (props.questionInfo.kind == '0' || props.questionInfo.kind == '1'))) {
      setFillAns("");
      // set
    }
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
    if ((kind == '0' || kind == '1') && props.type === "SIGNUP" && hasLimit &&
      choices
        .map((x) => isNaN(x.limit) || x.limit < 0)
        .reduce((x, y) => x || y)) {

      enqueueSnackbar("选项限额非法", {variant: 'error'});
      return;
    }
    if (props.type === "EXAM") {
      if (isNaN(score) || score === undefined) {
        enqueueSnackbar("题目分值非法", {variant: 'error'});
        return;
      }
      if (score < 0) {
        enqueueSnackbar("题目分值不得小于零", {variant: 'error'});
        return;
      }
    }


    const newQ = {
      id: props.questionInfo.id,
      description: description,
      kind: parseInt(kind),
      must: must === "1" ? 1 : 0,
      title: title.trim(),
      choices: choices.map((x) => x.content.trim()),
      isElement: props.type === "SIGNUP" ? !hasLimit : element,
      quota: choices.map((x) => x.limit),
      standardAnswer: {
        score: score,
        content: kind == '0' || kind == '1' ? choices.map((x) => x.selected).reduce((pre, cur, index) => {
          const newArray = pre.slice();
          if (cur) newArray.push(index)
          return newArray
        }, []) : fillAns.split(/[；;]+/)
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
        <Grid
          container
          direction="column">
          <Grid
            item
            className={classes.grid}
          >
            <TextField
              required
              id="filled-required"
              label="题目"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
              }}
              error={title.trim() === ""}
              helperText={title.trim() === "" && "题目不得为空"}
              multiline
              fullWidth
            />
          </Grid>

          <Grid item className={classes.grid}>
            <TextField
              label="描述"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value)
              }}
              multiline
              fullWidth
            />
          </Grid>

          <Grid item className={classes.grid}>
            <FormControl component="fieldset" className={classes.content}>
              <FormLabel component="legend"> 是否必填：</FormLabel>
              <RadioGroup aria-label="must?"
                          onChange={(event) => {
                            setMust(event.target.value);
                          }}
                          value={must}
                          row
              >
                <FormControlLabel value={"1"} control={<Radio/>} label="是"/>
                <FormControlLabel value={"0"} control={<Radio/>} label="否"/>
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item className={classes.grid}>
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
          </Grid>


          {props.type === "EXAM" ?
            <Grid item className={classes.grid}>
              <FormControl component="fieldset" className={classes.content}>
                <FormLabel component="legend"> 是否置顶改题（不参与试题乱序）：</FormLabel>
                <RadioGroup aria-label="must?"
                            onChange={(event) => {
                              setElement(event.target.value === "0");
                            }}
                            value={element ? "0" : '1'}
                            row
                >
                  <FormControlLabel value={"1"} control={<Radio/>} label="是"/>
                  <FormControlLabel value={"0"} control={<Radio/>} label="否"/>
                </RadioGroup>
              </FormControl>
            </Grid> : null
          }

          {props.type === "EXAM" ?
            <Grid item className={classes.grid}>
              <div
                className={classes.scoreLine}>
                <TextField
                  label="题目分值"
                  value={score}
                  type="number"
                  onChange={handleChangeScore}
                  inputProps={{
                    size: 10
                  }}
                  fullWidth
                /></div>
            </Grid> : null
          }


          {/* 选择题*/}
          {kind == '0' || kind == '1' ?
            <Grid item className={classes.grid}>
              <SelectDialogBody
                choices={choices}
                setChoices={setChoices}
                type={props.type}
                settings={props.settings}
                hasLimit={hasLimit}
                setHasLimit={setHasLimit}
              />
            </Grid> : null
          }

          {/*填空题答案*/}
          {(kind == '2' || kind == '3') && props.type === "EXAM" ?
            <Grid item className={classes.grid}>
              <TextField
                required
                id="filled-required"
                label="答案（多个可行的答案中间用分号（；）隔开）"
                value={fillAns}
                onChange={(event) => {
                  setFillAns(event.target.value)
                }}
                error={title.trim() === ""}
                helperText={title.trim() === "" && "答案不得为空"}
                multiline
                fullWidth
              />
            </Grid>
            : null
          }

        </Grid>
      </DialogContent>

    )
  ;


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