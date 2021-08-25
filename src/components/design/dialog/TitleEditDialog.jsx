import {DialogTitle, TextField, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useForm} from "react-hook-form";
import EditDialog from "./EditDialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";

const useStyle = makeStyles((theme) => ({
  grid: {
    margin: theme.spacing(1)
  }
}))

function TitleEditDialog(props) {
  const classes = useStyle();

  const dialogTitle = (
    <DialogTitle>
      全局设置
    </DialogTitle>
  );

  const dialogContent = (
    <DialogContent>
      <DialogContentText>
        为了更好的呈现效果，请把标题控制在 20 个字以内
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="标题"
        type="text"
        value={props.title|| ''}
        error={props.title === ""}
        onChange={props.handleTitleChange}
        fullWidth
      />
      <TextField
        autoFocus
        margin="dense"
        id="description"
        label="简介"
        type="text"
        multiline
        value={props.description|| ''}
        onChange={props.handleDescriptionChange}
        fullWidth
      />
    </DialogContent>);


  return (
    <EditDialog
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      open={props.open}
      close={props.close}
      save={props.handleModify}
    />
  );
}

export default TitleEditDialog;