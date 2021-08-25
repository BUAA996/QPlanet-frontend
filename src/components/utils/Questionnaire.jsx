import { Button, Card, Divider, Grid, Link, Typography } from '@material-ui/core'
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
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import BarChartIcon from '@material-ui/icons/BarChart';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
    paddingRight: theme.spacing(1)
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
  buttons: {
    fontsize: 12,
  }
}))

const Questionaire_STATUS = ['未发布', '已发布', '已完成', '已删除']

function Info(props) {
  const classes = useStyles()

  return (
    <Typography variant="h6" component="span" className={classes.info} {...props}>
      {props.children}
    </Typography>
  );
}

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

  return (props.showType === -1  && props.status !== 3) ||
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
            <Info style={{color: 'red'}}>{Questionaire_STATUS[props.status]}</Info>
            <Info>
              {props.status === 1 ? (
                <>发布时间: {props.uploadTime}</>
              ) : (
                <>创建时间: {props.createTime}</>
              )}
            </Info>
            <Info>
              填写人数：{props.count}
            </Info>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <Grid container className={classes.sub}>
          <Grid item xs={12} className={classes.description}>
            {props.description}
          </Grid>
          <Grid item xs={7} className={classes.buttons}>
            <Button
              component={RouterLink}
              to={'/design/' + props.hash}
              color='primary'
              startIcon={<EditIcon />}
              size="small"
            >
              编辑
            </Button>
            <Button
              color='primary'
              onClick={() => {
                if (props.status !== 1) {
                  enqueueSnackbar(('当前问卷状态为' + Questionaire_STATUS[props.status] + '，不能分享'), {
                    variant: 'warning',
                  })
                } else {
                  setOpenDialog(true)
                }
              }}
              startIcon={<ShareIcon />}
              size="small"
            >
              分享
            </Button>
            <Button
              component={RouterLink}
              to={'/feedback/' + props.hash}
              color='primary'
              startIcon={<BarChartIcon />}
              size="small"
            >
              统计
            </Button>
            <Button
              component={RouterLink}
              to={'/preview/' + props.hash}
              color='primary'
              startIcon={<VisibilityIcon />}
              size="small"
            >
              预览
            </Button>
          </Grid>
          <Grid item xs={5}>
            {props.status == 0 ? (
              <Button color='primary' onClick={() => handleRelease()} startIcon={<PlayArrowIcon />} size="small">
                发布
              </Button>
            ) : null}
            {props.status == 1 ? (
              <Button color='primary' onClick={() => handleClose()} startIcon={<StopIcon />} size="small">
                停止
              </Button>
            ) : null}
            {props.status == 1 ? (
              <Button color='primary' onClick={() => handleReset()} startIcon={<RotateLeftIcon />} size="small">
                重置
              </Button>
            ) : null}
            <Button color='primary' onClick={() => handleCopy()} startIcon={<DescriptionIcon />} size="small">
              复制
            </Button>
            <Button
              color='primary'
              onClick={() => handleDelete({ id: props.id })}
              startIcon={props.stauts === 3 ? <DeleteForeverIcon /> : <DeleteIcon />} 
              size="small"
            >
              {props.status === 3 ? '彻底删除' : '删除'}{' '}
            </Button>
            {props.status == 3 ? (
              <Button color='primary' onClick={() => handleRecover()} startIcon={<RestoreFromTrashIcon />} size="small">
                恢复
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
