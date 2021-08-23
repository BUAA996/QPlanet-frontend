import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
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
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // width: '100%',
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

function Feedback() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

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
    <Grid container className={classes.root}>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        {data.map((item) => {
          if (item.kind === 1) return <Choice data={item} key={item.key} />
          else return <Completion data={item} key={item.key} />
        })}
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
