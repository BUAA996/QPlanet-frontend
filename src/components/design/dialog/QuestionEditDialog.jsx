import { Box, Button, DialogContent, DialogTitle, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditDialog from "./EditDialog";



const useStyle = makeStyles((theme) => ({

}))

function QuestionEditDialog(props) {
  const classes = useStyle();

  const dialogTitle = (
    <DialogTitle>
      全局设置
    </DialogTitle>
  );
  const dialogContent = (
    <>
      <Box>
        题目：
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="标题"
          variant="filled"
        />
      </Box>
      <Box>
        是否必填：
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <RadioGroup aria-label="must?" name="must?" value={true} onChange={null}>
            <FormControlLabel value={true} control={<Radio />} label="是" />
            <FormControlLabel value={false} control={<Radio />} label="否" />
          </RadioGroup>
        </FormControl>
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

export default QuestionEditDialog;