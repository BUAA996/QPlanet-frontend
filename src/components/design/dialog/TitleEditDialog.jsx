import { Box, Button, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReportProblemSharp } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import EditDialog from "./EditDialog";

const useStyle = makeStyles((theme) => ({

}))

function TitleEditDialog(props) {
  const classes = useStyle();
  const { register,
    handleSubmit,
    formState: { errors } } = useForm();
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
      <form onSubmit={saveFunc}>
        <TextField
          required
          label="标题"
          id="filled-required"
          defaultValue={props.title}
          onChange={title.onChange}
          name={title.name}
          inputRef={title.ref}
          error={!!errors.title}
          helperText={errors.title && errors.title.message}
          variant="outlined"
        />


        <TextField
          required
          id="filled-required"
          label="简介"
          defaultValue={props.detail}
          onChange={detail.onChange}
          name={detail.name}
          inputRef={detail.ref}
          error={!!errors.detail}
          helperText={errors.detail && errors.detail.message}
          variant="outlined"
          multiline
          maxRows={4}
        />
      </form>
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