import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputBase,
} from '@material-ui/core'
import Completion from 'components/feedback/Completion'
import Choice from 'components/feedback/Choice'
import { useEffect } from 'react'
import { getStatistics } from 'api/result'
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

function Feedback() {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const [model, setModel] = useState(1)
  const [data, setData] = useState([])
  const { id: hashcode } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()

  useTitle('分析&下载 - 问卷星球')

  useEffect(() => {
    getStatistics({ hash: hashcode })
      .then((res) => {
        console.log(res.data)
      })
      .catch(() => {
        enqueueSnackbar('该问卷不存在', { variant: 'warning' })
      })
  }, [hashcode, enqueueSnackbar])

  const handleOpen = (event, reason) => {
    if (reason === 'toggle') setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'toggle') setOpen(false)
  }

  const handleClick = (name) => {
    if (name === '下载统计数据') {
    } else if (name === '发送问卷') {
    } else if (name === '预览问卷') {
      history.push('/preview/' + hashcode)
    }
  }

  const actions = [
    { icon: <CloudDownload />, name: '下载统计数据' },
    { icon: <Send />, name: '发送问卷' },
    { icon: <Visibility />, name: '预览问卷' },
  ]

  return (
    <Grid container>
      <Grid item xs={3} container alignItems='center' direction='column'>
        <Typography variant='h4' className={classes.title}>
          统计&amp;分析
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
            <MenuItem value={1}>默认报告</MenuItem>
            <MenuItem value={2}>交叉分析</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} container>
        <Grid item xs={12}>
          {data.map((item) => {
            if (item.kind === 1) return <Choice data={item} key={item.key} />
            else return <Completion data={item} key={item.key} />
          })}
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
  )
}

export default Feedback
