import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CreateRounded } from '@material-ui/icons';
import { useState } from "react";
import TitleEditDialog from "./dialog/TitleEditDialog";
import EditLayer from "./EditLayer";

const useStyle = makeStyles((theme) => ({
  editBtn: {
    margin: theme.spacing(1)
  }
}))

function TitleEdit(props) {
  const classes = useStyle();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const saveSettings = (title, detail) => {
    props.func.setTitle(title);
    props.func.setDetail(detail);
  }


  const buttonList = [
    {
      id: 1,
      content: "编辑",
      icon: (<CreateRounded />),
      onClick: (() => handleDialogOpen())
    },
  ].map((btn) =>
  (<Button
    style={{
      backgroundColor: "white",
    }}
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
      <TitleEditDialog
        title={props.title}
        detail={props.detail}
        open={dialogOpen}
        close={handleDialogClose}
        save={saveSettings}
      />

    </>)

}

export default TitleEdit;