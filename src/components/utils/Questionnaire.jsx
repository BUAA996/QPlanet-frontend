import {
  Button,
  Card,
  Divider,
  Grid,
  Link,
  Typography,
} from '@material-ui/core'
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
import EditIcon from '@material-ui/icons/Edit'
import ShareIcon from '@material-ui/icons/Share'
import BarChartIcon from '@material-ui/icons/BarChart'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import DescriptionIcon from '@material-ui/icons/Description'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash'
import VisibilityIcon from '@material-ui/icons/Visibility'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  title: {
    marginLeft: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
    // paddingRight: theme.spacing(1)
    backgroundColor: theme.palette.secondary.dark,
  },
  sub: {
    marginLeft: 20,
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    paddingLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    // color: theme.palette.primary.light,
  },
  buttons: {
    // fontsize: 12
    marginRight: theme.spacing(1),
  },
}))

const Questionaire_STATUS = ['未发布', '已发布', '已删除']
const STATUS = {
  Saved: 0,
  Released: 1,
  Deleted: 2,
}

function Info(props) {
  const classes = useStyles()
  return (
    <Grid item {...props}>
      <Typography
        variant='h6'
        component='span'
        className={classes.info}
        {...props}
      >
        {props.children}
      </Typography>
    </Grid>
  )
}

function TimeInfo(props) {
  return (
    <Grid
      item
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      component='span'
      {...props}
    >
      <Info>创建时间: {props.createTime}</Info>
      {props.status === 1 ? <Info>发布时间: {props.uploadTime}</Info> : null}
    </Grid>
  )
}

function Questionare(props) {
  const classes = useStyles()
  const history = useHistory()
  const [openDialog, setOpenDialog] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  function handleDelete(data) {
    deleteQuestionnaire(data).then(() => props.onChange())
  }

  function handleRecover() {
    recover({ id: props.id }).then(() => props.onChange())
  }

  function handleRelease() {
    release({ id: props.id }).then(() => props.onChange())
  }

  function handleClose() {
    close({ id: props.id }).then(() => props.onChange())
  }

  function handleReset() {
    reset({ id: props.id }).then(() => props.onChange())
  }

  function handleCopy() {
    copy({ qid: props.id, title: props.title + '-副本' }).then(() =>
      props.onChange()
    )
  }

  console.log(props)

  return true ? (
    <>
      <Card className={classes.root}>
        <Grid container>
          <Grid item xs={7}>
            <Grid className={classes.title}>{props.title}</Grid>
          </Grid>
          <Grid
            item
            xs={5}
            container
            className={classes.info}
            direction='row'
            justifyContent='flex-end'
            alignItems='center'
          >
            <Info style={{ color: 'red' }} xs={2}>
              {Questionaire_STATUS[props.status]}
            </Info>
            <TimeInfo {...props} xs={6} />
            <Info xs={3}>填写人数：{props.count}</Info>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <Grid container className={classes.sub}>
          <Grid item xs={12} className={classes.description}>
            {props.description}
          </Grid>
          <Grid item xs={7}>
            {props.status !== STATUS.Deleted && (
              <Button
                component={RouterLink}
                to={'/design/' + props.hash}
                color='primary'
                startIcon={<EditIcon />}
                size='small'
                variant='outlined'
                className={classes.buttons}
              >
                编辑
              </Button>
            )}
            {props.status !== STATUS.Deleted && (
              <Button
                color='primary'
                onClick={() => {
                  if (props.status !== 1) {
                    enqueueSnackbar(
                      '当前问卷状态为' +
                        Questionaire_STATUS[props.status] +
                        '，不能分享',
                      {
                        variant: 'warning',
                      }
                    )
                  } else {
                    setOpenDialog(true)
                  }
                }}
                startIcon={<ShareIcon />}
                size='small'
                variant='outlined'
                className={classes.buttons}
              >
                分享
              </Button>
            )}
            <Button
              component={RouterLink}
              to={'/feedback/' + props.hash}
              color='primary'
              startIcon={<BarChartIcon />}
              size='small'
              variant='outlined'
              className={classes.buttons}
            >
              统计
            </Button>
            <Button
              component={RouterLink}
              to={'/preview/' + props.hash}
              color='primary'
              startIcon={<VisibilityIcon />}
              size='small'
              variant='outlined'
              className={classes.buttons}
            >
              预览
            </Button>
          </Grid>
          <Grid item xs={5}>
            {props.status == 0 ? (
              <Button
                color='primary'
                onClick={() => handleRelease()}
                startIcon={<PlayArrowIcon />}
                size='small'
                variant='outlined'
                className={classes.buttons}
              >
                发布
              </Button>
            ) : null}
            {props.status == 1 ? (
              <Button
                color='primary'
                onClick={() => handleClose()}
                startIcon={<StopIcon />}
                size='small'
                variant='outlined'
                className={classes.buttons}
              >
                停止
              </Button>
            ) : null}
            {props.status == 1 ? (
              <Button
                color='primary'
                onClick={() => handleReset()}
                startIcon={<RotateLeftIcon />}
                size='small'
                variant='outlined'
                className={classes.buttons}
              >
                重置
              </Button>
            ) : null}
            <Button
              color='primary'
              onClick={() => handleCopy()}
              startIcon={<DescriptionIcon />}
              size='small'
              variant='outlined'
              className={classes.buttons}
            >
              复制
            </Button>
            <Button
              color='primary'
              onClick={() => handleDelete({ id: props.id })}
              startIcon={
                props.stauts === 3 ? <DeleteForeverIcon /> : <DeleteIcon />
              }
              size='small'
              variant='outlined'
              className={classes.buttons}
            >
              {props.status === 3 ? '彻底删除' : '删除'}{' '}
            </Button>
            {props.status == 3 ? (
              <Button
                color='primary'
                onClick={() => handleRecover()}
                startIcon={<RestoreFromTrashIcon />}
                size='small'
                variant='outlined'
                className={classes.buttons}
              >
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
