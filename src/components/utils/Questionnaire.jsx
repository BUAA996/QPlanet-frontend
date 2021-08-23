import { Button, Card, Divider, Grid, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import {
  deleteQuestionnaire,
  recover,
  release,
  close,
  reset,
  copy,
} from 'api/questionaire'
import QRDialog from './QRDialog'
import { useState } from 'react'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  title: {
    marginLeft: 20,
  },
  info: {
    fontSize: 12,
  },
  sub: {
    marginLeft: 20,
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    paddingLeft: theme.spacing(3),
    color: theme.palette.primary.light,
  },
}))

const Questionaire_STATUS = ['未发布', '已发布', '已完成', '已删除']

function Questionare(props) {
  const classes = useStyles()
  const history = useHistory()
  const [openDialog, setOpenDialog] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  function handleDelete(data) {
    deleteQuestionnaire(data)
    history.go(0)
  }

  function handleRecover() {
    recover({ id: props.id })
    history.go(0)
  }

  function handleRelease() {
    release({ id: props.id })
    history.go(0)
  }

  function handleClose() {
    close({ id: props.id })
    history.go(0)
  }

  function handleReset() {
    reset({ id: props.id })
    history.go(0)
  }

  function handleCopy() {
    copy({ qid: props.id, title: props.title + '-副本' })
    history.go(0)
  }

  return props.showType === -1 ||
    props.showType === 5 ||
    props.showType === props.status ? (
    <>
      <Card className={classes.root}>
        <Grid container>
          <Grid item xs={7}>
            <Link
              component={RouterLink}
              to={'/preview/' + props.hash}
              className={classes.title}
            >
              {props.title}
            </Link>
          </Grid>
          <Grid item xs={5} className={classes.info}>
            ID:&nbsp;{props.id}&nbsp;
            <span style={{ color: 'red' }}>
              {Questionaire_STATUS[props.status]} &nbsp;
            </span>
            {props.status === 1 ? (
              <>发布时间: {props.uploadTime}</>
            ) : (
              <>创建时间: {props.createTime} </>
            )}
            填写人数:&nbsp;{props.count}&nbsp;
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <Grid container className={classes.sub}>
          <Grid item xs={12} className={classes.description}>
            {props.description}
          </Grid>
          <Grid item xs={7}>
            <Button
              component={RouterLink}
              to={'/design/' + props.hash}
              color='primary'
            >
              {' '}
              设计问卷{' '}
            </Button>
            <Button
              color='primary'
              onClick={() => {
                if (props.status == 0) {
                  enqueueSnackbar('该问卷还未发布，不能分享', {
                    variant: 'warning',
                  })
                } else {
                  setOpenDialog(true)
                }
              }}
            >
              {' '}
              分享问卷{' '}
            </Button>
            <Button
              component={RouterLink}
              to={'/feedback/' + props.hash}
              color='primary'
            >
              {' '}
              分析/下载{' '}
            </Button>
          </Grid>
          <Grid item xs={5}>
            {props.status == 0 ? (
              <Button color='primary' onClick={() => handleRelease()}>
                {' '}
                发布{' '}
              </Button>
            ) : null}
            {props.status == 1 ? (
              <Button color='primary' onClick={() => handleClose()}>
                {' '}
                停止{' '}
              </Button>
            ) : null}
            {props.status == 1 ? (
              <Button color='primary' onClick={() => handleReset()}>
                {' '}
                重置{' '}
              </Button>
            ) : null}
            <Button color='primary' onClick={() => handleCopy()}>
              {' '}
              复制{' '}
            </Button>
            <Button
              color='primary'
              onClick={() => handleDelete({ id: props.id })}
            >
              {' '}
              {props.status === 3 ? '彻底删除' : '删除'}{' '}
            </Button>
            {props.status == 3 ? (
              <Button color='primary' onClick={() => handleRecover()}>
                {' '}
                恢复{' '}
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </Card>
      <QRDialog
        open={openDialog}
        setOpen={setOpenDialog}
        url={'https://qplanet.matrix53.top/fill/' + props.hash}
      />
    </>
  ) : null
}

export default Questionare
