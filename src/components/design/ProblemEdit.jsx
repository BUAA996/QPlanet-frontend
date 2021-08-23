import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CreateRounded, Delete, AddCircleOutlineRounded } from '@material-ui/icons';
import QuestionEditDialog from "./dialog/QuestionEditDialog";
import EditLayer from "./EditLayer";
import { useState } from "react";
import TtitleEditDialog from "./dialog/TitleEditDialog";

const useStyle = makeStyles((theme) => ({
  editBtn: {
    margin: theme.spacing(1)
  }
}))

function ProblemEdit(props) {
  const classes = useStyle();

  const [dialogOpen, setDialogOpen] = useState(false);


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
        props.add(props.index, {
          kind: 0,
          must: 1,
          title: '题目',
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

  return (
    <>
      <EditLayer
        buttons={buttonList}
        content={props.content}
      />
      <QuestionEditDialog
        open={dialogOpen}
        close={handleDialogClose}
        questionInfo={props.questionInfo}
        del={props.del}
        edit={props.edit}
      />

    </>);

}

export default ProblemEdit;