import { makeStyles } from '@material-ui/core/styles'
import * as echarts from 'echarts/core'
import { BarChart, PieChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useEffect } from 'react'
import { useRef } from 'react'

echarts.use([PieChart, GridComponent, BarChart, CanvasRenderer])

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}))

function Graph({ type, data }) {
  const classes = useStyles()
  const ref = useRef()

  useEffect(() => {
    const chart = echarts.init(ref.current)

    const option = {
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    }

    chart.setOption(option)
  })

  return <div className={classes.root} ref={ref}></div>
}

function pieOption() {
  return null
}

function ringOption() {
  return null
}

function barOption() {
  return null
}

function histogramOption() {
  return null
}

export default Graph
