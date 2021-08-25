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
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSnackbar } from 'notistack'
import icon from 'assets/logo.svg'
import { download } from 'utils'

const useStyles = makeStyles((theme) => ({
  closeBtn: {
    position: 'absolute',
    right: theme.spacing(1),
  },
  btn: {
    marginLeft: theme.spacing(3),
  },
  edit: {
    width: 380,
    marginLeft: theme.spacing(2),
  },
}))

function QRDialog({ open, setOpen, url, title, openTitle, downloadTitle }) {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

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
          <QRCode
            value={url}
            size={128}
            imageSettings={{
              src: `${icon}`,
              height: 40,
              width: 40,
              // excavate: true,
            }}
            id='qrcode-canvas'
          />
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <TextField
              className={classes.edit}
              value={url}
              inputProps={{ spellCheck: false }}
              variant='outlined'
            />
            <Box marginTop={2.5} position='relative' left={-10}>
              <CopyToClipboard
                text={url}
                onCopy={() => {
                  enqueueSnackbar('复制成功', { variant: 'success' })
                }}
              >
                <Button
                  variant='outlined'
                  color='primary'
                  className={classes.btn}
                >
                  复制链接
                </Button>
              </CopyToClipboard>
              <Button
                variant='outlined'
                color='primary'
                className={classes.btn}
                onClick={() => {
                  let canvasElement = document.getElementById('qrcode-canvas')
                  let imgUrl = canvasElement.toDataURL('image/png')
                  download(imgUrl, downloadTitle)
                }}
              >
                下载二维码
              </Button>
              <Button
                variant='outlined'
                color='primary'
                className={classes.btn}
                onClick={() => {
                  window.location.href = url
                }}
              >
                {openTitle}
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

QRDialog.defaultProps = {
  openTitle: '打开问卷',
  downloadTitle: '问卷二维码',
  title: '问卷链接与二维码',
}

export default QRDialog
