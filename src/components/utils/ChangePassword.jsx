import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  Box,
  DialogActions,
  IconButton,
  DialogContent,
  TextField,
  Button,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { changePassword } from 'api/auth'

const useStyles = makeStyles((theme) => ({}))

function ChangePassword({ open, setOpen }) {
  const classes = useStyles()

  return (
    <Dialog open={open} maxWidth='sm'>
      <Box
        display='flex'
        justifyContent='center'
        width={600}
        position='relative'
      >
        <DialogTitle>修改密码</DialogTitle>
        <DialogActions className={classes.closeBtn}>
          <IconButton
            onClick={() => {
              setOpen(false)
            }}
          >
            <Close />
          </IconButton>
        </DialogActions>
      </Box>
      <DialogContent>
        <form>
          <TextField />
          <TextField />
          <Button type='submit'>确认</Button>
          <Button
            onClick={() => {
              setOpen(false)
            }}
          >
            取消
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePassword
