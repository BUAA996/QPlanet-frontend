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

const data = [
  {
    key: 1,
    kind: 1,
    type: '单选题',
    title: '标题',
    choice: [
      {
        key: 1,
        option: '选项1',
        count: 4,
      },
      {
        key: 2,
        option: '选项2',
        count: 3,
      },
    ],
    total: 7,
  },
  {
    key: 2,
    kind: 1,
    type: '多选题',
    title: '标题',
    choice: [
      {
        key: 1,
        option: '选项1',
        count: 4,
      },
      {
        key: 2,
        option: '选项2',
        count: 3,
      },
      {
        key: 3,
        option: '选项3',
        count: 4,
      },
    ],
    total: 4,
  },
  {
    key: 3,
    kind: 2,
    type: '填空题',
    title: '标题',
    choice: [
      {
        key: 1,
        option: '词汇1',
        count: 4,
      },
      {
        key: 2,
        option: '词汇2',
        count: 3,
      },
      {
        key: 3,
        option: '词汇3',
        count: 7,
      },
    ],
    total: 7,
  },
  {
    key: 4,
    kind: 1,
    type: '评分题',
    title: '标题',
    choice: [
      {
        key: 1,
        option: '0-1',
        count: 3,
      },
      {
        key: 2,
        option: '1-2',
        count: 4,
      },
      {
        key: 3,
        option: '2-3',
        count: 7,
      },
    ],
    total: 14,
  },
]

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
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState(1)

  useTitle('分析&下载 - 问卷星球')

  useEffect(() => {
    getStatistics({ qid: 10 }).then((res) => {
      console.log(res.data)
    })
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </Grid>
    </Grid>
  )
}

export default Feedback
