import { Box, Button, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditDialog from "./EditDialog";



const useStyle = makeStyles((theme) => ({

}))

function TtitleEditDialog(props) {
  const classes = useStyle();

  const dialogTitle = (
    <DialogTitle>
      全局设置
    </DialogTitle>
  );
  const dialogContent = (
    <>
      <Box>
        标题：
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="标题"
          variant="filled"
        />
      </Box>
      <Box>
        简介：

        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="简介"
          variant="filled"
          multiline
          maxRows={4}
        />
      </Box>
    </>

  );


  return (
    <EditDialog
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      open={props.open}
      close={props.close}
    />
  );
}

export default TtitleEditDialog;