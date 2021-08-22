import { makeStyles } from '@material-ui/core/styles'
import * as echarts from 'echarts/core'
import { BarChart, PieChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useEffect } from 'react'
import { useRef } from 'react'

echarts.use([PieChart, GridComponent, BarChart, CanvasRenderer])

const useStyles = makeStyles((theme) => ({
  root: {},
}))

function Graph({ type, data }) {
  const classes = useStyles()
  const ref = useRef()

  useEffect(() => {
    const chart = echarts.init(ref)

    const option = {
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    }

    chart.setOption(option)
  })

  return <div className={classes.root} ref={ref}></div>
}

export default Graph
