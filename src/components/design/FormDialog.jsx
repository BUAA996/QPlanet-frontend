import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CreateRounded } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(props.title);
  const [description, setDescription] = React.useState(props.description);
  const { enqueueSnackbar } = useSnackbar()


  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);
  useEffect(() => {
    setDescription(props.description);
  }, [props.description])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleModify = () => {

    if (title.trim() === "") {
      enqueueSnackbar("问卷标题不能为空", { variant: 'error' })
      return;
    }
    if (description.trim() === "") {
      enqueueSnackbar("问卷简介不能为空", { variant: 'error' })
      return;
    }

    props.setTitle(title.trim());
    props.setDescription(description.trim());
    setOpen(false);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  return (
    <Grid item>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<CreateRounded />}
        onClick={handleClickOpen}
      >
        问卷编辑
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">修改标题</DialogTitle>
        <DialogContent>
          <DialogContentText>
            为了更好的呈现效果，请把标题控制在 20 个字以内
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="标题"
            type="text"
            value={title}
            error={title.trim() === ""}
            onChange={handleTitleChange}
            defaultValue={props.title}
            helperText="问卷标题不得为空"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="简介"
            type="text"
            value={description}
            defaultValue={props.description}
            onChange={handleDescriptionChange}
            helperText="简介不得为空"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={handleModify} color="primary">
            完成
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
