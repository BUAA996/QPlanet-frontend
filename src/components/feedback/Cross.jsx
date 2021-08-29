import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  TextField,
  MenuItem,
  Box,
  Button,
  Fade,
  IconButton,
} from '@material-ui/core'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { Autorenew } from '@material-ui/icons'
import Graph from './Graph'
import { crossAnalyze } from 'api/result'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(7.7),
    padding: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& .MuiButton-containedPrimary': {
      color: 'white',
      fontSize: '1.03em',
    },
  },
  input: {
    width: '48%',
  },
}))

function CrossTable() {
  return null
}

function Cross({ qid, choice }) {
  const classes = useStyles()
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const [showGraph, setShowGraph] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [index, setIndex] = useState(0)
  const [graphData, setGraphData] = useState([])

  return (
    <Card className={classes.root}>
      <Box width='100%' display='flex' justifyContent='space-between'>
        <TextField
          select
          label='自变量'
          value={first}
          onChange={(event) => {
            if (event.target.value === second) {
              enqueueSnackbar('自变量和因变量不能重复', { variant: 'warning' })
            } else {
              setFirst(event.target.value)
            }
          }}
          className={classes.input}
        >
          {choice.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.content}
            </MenuItem>
          ))}
        </TextField>
        <IconButton
          onClick={() => {
            let tmp = first
            setFirst(second)
            setSecond(tmp)
          }}
        >
          <Autorenew />
        </IconButton>
        <TextField
          select
          label='因变量'
          value={second}
          onChange={(event) => {
            if (event.target.value === first) {
              enqueueSnackbar('自变量和因变量不能重复', { variant: 'warning' })
            } else {
              setSecond(event.target.value)
            }
          }}
          className={classes.input}
        >
          {choice.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.content}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box
        display='flex'
        width='100%'
        marginTop='3.5%'
        justifyContent='space-between'
      >
        <Button
          color='primary'
          variant='contained'
          onClick={() => {
            if (first === '' || second === '') {
              enqueueSnackbar('自变量和因变量均不能缺失', {
                variant: 'warning',
              })
              return
            }
            crossAnalyze({
              qid: qid,
              t1: choice[first].sendId,
              t2: choice[second].sendId,
            })
              .then((res) => {
                let data = []
                for (let i = 0; i < res.data.count.length; ++i) {
                  for (let j = 0; j < res.data.count[i].length; ++j) {
                    data.push({
                      option:
                        choice[first].option[i] +
                        '/' +
                        choice[second].option[j],
                      count: res.data.count[i][j],
                    })
                  }
                }
                let graphData = {
                  total: res.data.total,
                  title: '交叉分析',
                  choice: data,
                }
                console.log(graphData)
                setGraphData(graphData)
              })
              .then((res) => {
                if (!showGraph) {
                  setShowGraph(true)
                }
              })
              .catch((res) => {
                enqueueSnackbar('当前网络状况差，请检查网络连接', {
                  variant: 'warning',
                })
              })
          }}
        >
          交叉分析
        </Button>
        <Fade in={showGraph} timeout={300}>
          <Button
            color='primary'
            variant={index === 5 ? 'contained' : 'outlined'}
            onClick={() => {
              setIndex((index) => {
                return index === 5 ? 0 : 5
              })
            }}
          >
            表格
          </Button>
        </Fade>
        <Fade in={showGraph} timeout={400}>
          <Button
            color='primary'
            variant={index === 3 ? 'contained' : 'outlined'}
            onClick={() => {
              setIndex((index) => {
                return index === 3 ? 0 : 3
              })
            }}
          >
            柱状图
          </Button>
        </Fade>
        <Fade in={showGraph} timeout={500}>
          <Button
            color='primary'
            variant={index === 6 ? 'contained' : 'outlined'}
            onClick={() => {
              setIndex((index) => {
                return index === 6 ? 0 : 6
              })
            }}
          >
            雷达图
          </Button>
        </Fade>
        <Fade in={showGraph} timeout={600}>
          <Button
            color='primary'
            variant={index === 1 ? 'contained' : 'outlined'}
            onClick={() => {
              setIndex((index) => {
                return index === 1 ? 0 : 1
              })
            }}
          >
            饼状图
          </Button>
        </Fade>
        <Fade in={showGraph} timeout={700}>
          <Button
            color='primary'
            variant={index === 2 ? 'contained' : 'outlined'}
            onClick={() => {
              setIndex((index) => {
                return index === 2 ? 0 : 2
              })
            }}
          >
            圆环图
          </Button>
        </Fade>
      </Box>
      {showGraph && index !== 0 && (
        <Fade in={showGraph} timeout={1000}>
          <Box width='100%' height='400px' marginTop='3%'>
            {index !== 5 && <Graph type={index} data={graphData} />}
          </Box>
        </Fade>
      )}
    </Card>
  )
}

export default Cross
