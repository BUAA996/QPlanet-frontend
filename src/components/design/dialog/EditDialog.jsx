import { Button, Container, Dialog, DialogActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";


const useStyle = makeStyles((theme) => ({
  dialog: {

  }
}))

function EditDialog(props) {
  const classes = useStyle();




  return (
    <Dialog
      className={classes.dialog}
      open={props.open}
      keepMounted
      onClose={props.close}
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="Edit-dialog-title"
      aria-describedby="edit-dialog-description"
    >
      {props.dialogTitle}
      <Container>
        {props.dialogContent}
      </Container>

      <DialogActions>
        <Button type="submit" onClick={props.save} color="primary">
          保存
        </Button>
        <Button onClick={props.close} color="primary">
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;