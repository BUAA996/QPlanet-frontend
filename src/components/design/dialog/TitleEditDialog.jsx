import { Box, Button, DialogContent, DialogTitle, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import EditDialog from "./EditDialog";

const useStyle = makeStyles((theme) => ({
  grid: {
    margin: theme.spacing(1)
  }
}))

function TitleEditDialog(props) {
  const classes = useStyle();
  const { register,
    handleSubmit,
    formState: { errors } } = useForm({
      defaultValues: {
        title: props.title,
        "detail": props.detail
      }
    });

  const onSubmit = (data) => {
    props.save(data.title, data.detail)
  };

  const title = register("title", {
    required: { value: true, message: "问卷标题不能为空" },
  });
  const detail = register("detail", {
    required: { value: true, message: "问卷描述不能为空" }
  })

  const dialogTitle = (
    <DialogTitle>
      全局设置
    </DialogTitle>
  );

  const saveFunc = handleSubmit(onSubmit);


  const dialogContent = (
    <>
      <Grid container
        direction="column">
        <Grid item
          className={classes.grid}>
          <TextField
            required
            label="标题"
            id="filled-required"
            // defaultValue={props.title}
            onChange={title.onChange}
            name={title.name}
            inputRef={title.ref}
            error={!!errors.title}
            helperText={errors.title && errors.title.message}
            variant="outlined"
          />
        </Grid>


        <Grid item
          className={classes.grid}>

          <TextField
            required
            id="filled-required"
            label="简介"
            // defaultValue={props.detail}
            onChange={detail.onChange}
            name={detail.name}
            inputRef={detail.ref}
            error={!!errors.detail}
            helperText={errors.detail && errors.detail.message}
            variant="outlined"
            multiline
            maxRows={4}
          />
        </Grid>
      </Grid>
    </>

  );


  return (
    <EditDialog
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      open={props.open}
      close={props.close}
      save={saveFunc}
    />
  );
}

export default TitleEditDialog;