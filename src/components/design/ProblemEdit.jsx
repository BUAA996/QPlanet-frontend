import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CreateRounded, Delete, AddCircleOutlineRounded } from '@material-ui/icons';
import QuestionEditDialog from "./dialog/QuestionEditDialog";
import EditLayer from "./EditLayer";
import { useState } from "react";
import Problem from "components/utils/Problem";

const useStyle = makeStyles((theme) => ({
  editBtn: {
    margin: theme.spacing(1)
  }
}))

function ProblemEdit(props) {
  const classes = useStyle();
  console.log(props.questionInfo.id)
  const [dialogOpen, setDialogOpen] = useState(props.questionInfo.id[0] === 'N');


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
      icon: (<CreateRounded />),
      onClick: (() => handleDialogOpen()),
    }, {
      id: 2,
      content: "删除",
      icon: (<Delete />),
      onClick: props.del,
    }, {
      id: 3,
      content: "上方插入",
      icon: (<AddCircleOutlineRounded />),
      onClick: () => {
        // console.log(props);
        props.add(props.index, {
          kind: 0,
          must: 1,
          title: '题目',
          description: '',
          choices: [
            '选项1',
            '选项2',
          ]
        })
      },
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

  function blankFunction() { }

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
        del={props.del}
        edit={props.edit}
        index={props.index}
      />

    </>);

}

export default ProblemEdit;