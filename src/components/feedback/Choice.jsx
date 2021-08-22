import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Template from './Template'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Typography,
  Button,
} from '@material-ui/core'
import { useState } from 'react'
import Graph from './Graph'

const useStyles = makeStyles((theme) => ({
  progress: {
    minHeight: theme.spacing(1.4),
    borderRadius: theme.spacing(1),
    width: '80%',
  },
  progressText: {
    width: '15%',
    marginLeft: '5%',
  },
  progressBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  midBtn: {
    marginRight: theme.spacing(1),
  },
}))

function DataTable({ data }) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small'>
        <TableHead>
          <TableRow>
            <TableCell align='center' style={{ width: '50%' }}>
              选项
            </TableCell>
            <TableCell align='center' style={{ width: '10%' }}>
              小计
            </TableCell>
            <TableCell align='center' style={{ width: '40%' }}>
              比例
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.choice.map((item) => (
            <TableRow key={item.key}>
              <TableCell component='th' scope='row' align='center'>
                {item.option}
              </TableCell>
              <TableCell align='center'>{item.count}</TableCell>
              <TableCell align='right'>
                <div className={classes.progressBox}>
                  <LinearProgress
                    variant='determinate'
                    value={(item.count / data.total) * 100}
                    className={classes.progress}
                  />
                  <Typography className={classes.progressText} variant='body2'>
                    {((item.count / data.total) * 100).toFixed(1) + '%'}
                  </Typography>
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell component='th' scope='row' align='center'>
              本题填写有效人数
            </TableCell>
            <TableCell align='center'>{data.total}</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function ButtonSet({ showTable, setShowTable, graphNum, setGraphNum }) {
  const classes = useStyles()

  return (
    <>
      <Button
        variant={showTable ? 'contained' : 'outlined'}
        onClick={() => {
          setShowTable((state) => !state)
        }}
        color='primary'
        className={classes.midBtn}
      >
        表格
      </Button>
      <Button
        color='primary'
        className={classes.midBtn}
        variant={graphNum === 1 ? 'contained' : 'outlined'}
        onClick={() => {
          setGraphNum((state) => (state === 1 ? 0 : 1))
        }}
      >
        饼状图
      </Button>
      <Button
        color='primary'
        className={classes.midBtn}
        variant={graphNum === 2 ? 'contained' : 'outlined'}
        onClick={() => {
          setGraphNum((state) => (state === 2 ? 0 : 2))
        }}
      >
        圆环图
      </Button>
      <Button
        color='primary'
        className={classes.midBtn}
        variant={graphNum === 3 ? 'contained' : 'outlined'}
        onClick={() => {
          setGraphNum((state) => (state === 3 ? 0 : 3))
        }}
      >
        柱状图
      </Button>
      <Button
        color='primary'
        className={classes.midBtn}
        variant={graphNum === 4 ? 'contained' : 'outlined'}
        onClick={() => {
          setGraphNum((state) => (state === 4 ? 0 : 4))
        }}
      >
        条形图
      </Button>
    </>
  )
}

function Choice({ data }) {
  const classes = useStyles()
  const [showTable, setShowTable] = useState(true)
  const [graphNum, setGraphNum] = useState(0)

  return (
    <Template title={data.title} type={data.type}>
      <Box>{showTable && <DataTable data={data} />}</Box>
      <Box display='flex' justifyContent='flex-end' mt={1}>
        <ButtonSet
          showTable={showTable}
          setShowTable={setShowTable}
          graphNum={graphNum}
          setGraphNum={setGraphNum}
        />
      </Box>
      <Box>
        <Graph type='test' data='test' />
      </Box>
    </Template>
  )
}

Choice.propTypes = {
  props: PropTypes.shape({
    choice: PropTypes.arrayOf(PropTypes.string),
    count: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
}

export default Choice
