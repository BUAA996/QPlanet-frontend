import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {CreateRounded} from '@material-ui/icons';
import {Grid} from '@material-ui/core';
import {useEffect} from 'react';
import {useSnackbar} from 'notistack';
import TitleEditDialog from "./dialog/TitleEditDialog";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(props.title);
  const [description, setDescription] = React.useState(props.description);
  const [settings, setSettings] = useState({})
  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);

  useEffect(() => {
    setDescription(props.description);
  }, [props.description]);

  useEffect(() => {
    setSettings(props.settings ?? {certification: 0})
  }, [props.settings]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle(props.title);
    setSettings(props.settings);
    setDescription(props.description);
  };


  const handleModify = () => {
    // check validity:
    //// title
    if (title.trim() === "") {
      enqueueSnackbar("问卷标题不能为空", {variant: 'error'});
      return;
    }
    //// description
    if (description.trim() === "") {
      enqueueSnackbar("问卷简介不能为空", {variant: 'error'})
      return;
    }
    //// deadline
    if (settings.hasDdl && settings.deadline === "") {
      enqueueSnackbar("问卷截止时间不能为空", {variant: 'error'})
      return;
    }


    switch (props.type) {
      // case "NORMAL":
      // case "VOTE":
      case "SIGNUP":
        if (settings.hasQuota) {
          if (isNaN(settings.quota) || settings.quota === null || settings.quota === undefined) {
            enqueueSnackbar("问卷限额不能为空", {variant: 'error'})
            return;
          }
          if (settings.quota < 0) {
            enqueueSnackbar("问卷限额不能为负数", {variant: 'error'})
            return;
          }
        }
        break;
      // case "EXAM":

    }

    // set
    props.setTitle(title.trim());
    props.setDescription(description.trim());
    props.setSettings(settings)

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
        startIcon={<CreateRounded/>}
        onClick={handleClickOpen}
      >
        问卷编辑
      </Button>

      <TitleEditDialog
        open={open}
        close={handleClose}
        save={handleModify}
        title={title}
        type={props.type}
        settings={settings}
        setSettings={setSettings}
        handleTitleChange={handleTitleChange}
        description={description}
        handleDescriptionChange={handleDescriptionChange}
        handleModify={handleModify}
      />
    </Grid>
  );
}
