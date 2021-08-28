import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CreateRounded, Delete, AddCircleOutlineRounded, FileCopyRounded} from '@material-ui/icons';
import QuestionEditDialog from "./dialog/QuestionEditDialog";
import EditLayer from "./EditLayer";
import {useState} from "react";
import Problem from "components/utils/Problem";
import {useEffect} from "react";

const useStyle = makeStyles((theme) => ({
  editBtn: {
    margin: theme.spacing(1)
  }
}))

function ProblemEdit(props) {
  const classes = useStyle();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (props.questionInfo.id[0] === 'N')
      setDialogOpen(true)
  }, [])

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const buttonList = [
    {
      id: 1,
      content: "编辑",
      icon: (<CreateRounded/>),
      onClick: (() => handleDialogOpen()),
    }, {
      id: 2,
      content: "删除",
      icon: (<Delete/>),
      onClick: props.del,
    }, {
      id: 3,
      content: "上方插入",
      icon: (<AddCircleOutlineRounded/>),
      onClick: () => {
        props.addDefault(props.index)
      },
    }, {
      id: 4,
      content: "复制",
      icon: (<FileCopyRounded/>),
      onClick: () => {
        const newQ = JSON.parse(JSON.stringify(props.questionInfo))
        props.add(props.index + 1, newQ);
      }
    }
  ].map((btn) =>
    (<Button
      className={classes.editBtn}
      variant="outlined"
      startIcon={btn.icon}
      key={btn.id}
      onClick={btn.onClick}
    >{btn.content}</Button>)
  )


  return (
    <>
      <EditLayer
        buttons={buttonList}
        content={props.content}
        problem={props.questionInfo}
      />
      {/* <Problem problem={props.problem} updateAns={() => blankFunction()}></Problem> */}
      <QuestionEditDialog
        open={dialogOpen}
        close={handleDialogClose}
        questionInfo={props.questionInfo}
        type={props.type}
        settings={props.settings}
        del={props.del}
        edit={props.edit}
        index={props.index}
      />

    </>);

}

export default ProblemEdit;