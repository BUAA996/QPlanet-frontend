import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputBase,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import Completion from 'components/feedback/Completion'
import Choice from 'components/feedback/Choice'
import Cross from 'components/feedback/Cross'
import Summary from 'components/feedback/Summary'
import { useEffect } from 'react'
import { getStatistics, downloadStatistics } from 'api/result'
import useTitle from 'hooks/useTitle'
import { useState } from 'react'
import {
  CloudDownload,
  Send,
  Visibility,
  Menu,
  MenuOpen,
} from '@material-ui/icons'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import { useHistory, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { download } from 'utils'
import QRDialog from 'components/utils/QRDialog'
import { useStateStore } from 'store'
import useRouteDefender from 'hooks/useRouteDefender'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.primary.main,
  },
  speedDial: {
    position: 'fixed',
    right: theme.spacing(10),
    bottom: theme.spacing(10),
  },
  formControl: {
    marginTop: theme.spacing(2),
  },
}))

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    color: theme.palette.primary.main,
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: theme.palette.primary.light,
      boxShadow: `0 0 0 1 ${theme.palette.primary.light}`,
    },
  },
}))(InputBase)

function DownloadDialog({ open, setOpen, hashcode }) {
  return (
    <Dialog open={open}>
      <DialogTitle>?????????????????????</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ???????????????Excel???????????????????????????????????????ABC??????
          <br />
          ???????????????Excel????????????????????????????????????????????????????????????
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            downloadStatistics({ hash: hashcode, type: '0' }).then((res) => {
              download(
                'https://api.matrix53.top/img/' + res.data.name,
                res.data.name
              )
            })
            setOpen(false)
          }}
          color='primary'
        >
          ????????????
        </Button>
        <Button
          onClick={() => {
            downloadStatistics({ hash: hashcode, type: '1' }).then((res) => {
              download(
                'https://api.matrix53.top/img/' + res.data.name,
                res.data.name
              )
            })
            setOpen(false)
          }}
          color='primary'
        >
          ????????????
        </Button>
        <Button
          onClick={() => {
            setOpen(false)
          }}
          color='primary'
        >
          ????????????
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function Feedback() {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const [model, setModel] = useState(1)
  const [data, setData] = useState([])
  const { id: hashcode } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()
  const [shareOpen, setShareOpen] = useState(false)
  const isLogin = useStateStore().isLogin
  const [crossData, setCrossData] = useState({})
  const [openDownload, setOpenDownload] = useState(false)

  useRouteDefender({
    assert: !isLogin,
    method: 'push',
    to: '/signin',
    msg: '??????????????????????????????',
  })

  useTitle('??????&?????? - ????????????')

  useEffect(() => {
    if (isLogin) {
      getStatistics({ hash: hashcode })
        .then((res) => {
          if (res.data.result === 1) {
            let map = [
              '?????????',
              '?????????',
              '?????????',
              '?????????',
              '?????????',
              '?????????',
            ]
            let data = res.data.questions.map((item, index) => ({
              type: map[item.type],
              total: res.data.total,
              title: item.content,
              choice:
                item.type === 5
                  ? []
                  : item.option.map((innerItem, innerIndex) => ({
                      option: innerItem,
                      count: item.count[innerIndex],
                      key: innerIndex,
                    })),
              key: index,
              ansList:
                item.type === 2 || item.type === 3 || item.type === 5
                  ? item.all.map((innerItem, innerIndex) => {
                      return {
                        id: innerIndex,
                        time: item.submit_time[innerIndex],
                        ans: innerItem,
                        author: item.authors[innerIndex],
                      }
                    })
                  : [],
            }))
            setData(data)
            let crossData = {
              qid: res.data.qid,
              choice: res.data.questions
                .filter((item) => item.type <= 1)
                .map((item, index) => {
                  return {
                    id: index,
                    content: item.content,
                    sendId: item.id,
                    option: item.option,
                  }
                }),
            }
            setCrossData(crossData)
          }
        })
        .catch(() => {
          enqueueSnackbar('??????????????????', { variant: 'warning' })
        })
    }
  }, [hashcode, enqueueSnackbar])

  const handleOpen = (event, reason) => {
    if (reason === 'toggle') setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'toggle') setOpen(false)
  }

  const handleClick = (name) => {
    if (name === '??????????????????') {
      setOpenDownload(true)
    } else if (name === '????????????') {
      setShareOpen(true)
    } else if (name === '????????????') {
      history.push('/preview/' + hashcode)
    }
  }

  const actions = [
    { icon: <CloudDownload />, name: '??????????????????' },
    { icon: <Send />, name: '????????????' },
    { icon: <Visibility />, name: '????????????' },
  ]

  return (
    <>
      <Grid container>
        <Grid item xs={3} container alignItems='center' direction='column'>
          <Typography variant='h4' className={classes.title}>
            ??????&amp;??????
          </Typography>
          <FormControl className={classes.formControl}>
            <Select
              value={model}
              onChange={(e) => {
                setModel(e.target.value)
              }}
              variant='filled'
              input={<BootstrapInput />}
            >
              <MenuItem value={1}>????????????</MenuItem>
              <MenuItem value={2}>????????????</MenuItem>
              <MenuItem value={3}>????????????</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} container>
          <Grid item xs={12} style={{ marginTop: '2.6%' }}>
            {model === 1 &&
              data.map((item) => {
                if (
                  item.type === '?????????' ||
                  item.type === '?????????' ||
                  item.type === '?????????'
                )
                  return <Completion data={item} key={item.key} />
                else return <Choice data={item} key={item.key} />
              })}
            {model === 2 && <Cross {...crossData} />}
            {model === 3 && <Summary />}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <SpeedDial
            ariaLabel='button-menu'
            className={classes.speedDial}
            icon={<SpeedDialIcon icon={<Menu />} openIcon={<MenuOpen />} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => {
                  handleClick(action.name)
                }}
              />
            ))}
          </SpeedDial>
        </Grid>
      </Grid>
      <QRDialog
        open={shareOpen}
        setOpen={setShareOpen}
        url={'https://qplanet.matrix53.top/fill/' + hashcode}
      />
      <DownloadDialog
        open={openDownload}
        setOpen={setOpenDownload}
        hashcode={hashcode}
      />
    </>
  )
}

export default Feedback
