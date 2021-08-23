import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  Box,
  DialogTitle,
  DialogActions,
  IconButton,
  DialogContent,
  TextField,
  Button,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import QRCode from 'qrcode.react'

const useStyles = makeStyles((theme) => ({
  closeBtn: {
    position: 'absolute',
    right: theme.spacing(1),
  },
  btn: {
    marginLeft: theme.spacing(2),
  },
  edit: {
    width: 400,
    marginLeft: theme.spacing(2),
  },
}))

function QRDialog({ open, setOpen, url, title }) {
  const classes = useStyles()

  return (
    <Dialog open={open} maxWidth='sm'>
      <Box
        display='flex'
        justifyContent='center'
        width={600}
        position='relative'
      >
        <DialogTitle>{title}</DialogTitle>
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
        <Box marginBottom={2} marginLeft={2} display='flex'>
          <QRCode value={url} size={128} />
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <TextField className={classes.edit} defaultValue={url} />
            <Box marginTop={1}>
              <Button
                variant='outlined'
                color='primary'
                className={classes.btn}
              >
                复制链接
              </Button>
              <Button variant='outlined' color='primary'>
                下载二维码
              </Button>
              <Button variant='outlined' color='primary'>
                打开问卷
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default QRDialog
