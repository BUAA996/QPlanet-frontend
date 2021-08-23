import { makeStyles } from '@material-ui/core/styles'
import * as echarts from 'echarts'
// import { BarChart, PieChart } from 'echarts/charts'
// import { GridComponent, TooltipComponent } from 'echarts/components'
// import { CanvasRenderer } from 'echarts/renderers'
import { useEffect } from 'react'
import { useRef } from 'react'
import 'echarts-wordcloud'

// echarts.use([
//   PieChart,
//   GridComponent,
//   BarChart,
//   CanvasRenderer,
//   TooltipComponent,
// ])

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
    let chart = echarts.getInstanceByDom(ref.current)
    if (chart == null) chart = echarts.init(ref.current)

    let option = null
    if (type === 1) option = pieOption(data)
    else if (type === 2) option = ringOption(data)
    else if (type === 3) option = barOption(data)
    else if (type === 4) option = histogramOption(data)
    else if (type === 5) option = cloudOption(data)

    chart.setOption(option, true)
  }, [type, data])

  return <div className={classes.root} ref={ref}></div>
}

function pieOption(data) {
  return {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: data.choice.map((item) => ({
          name: item.option,
          value: item.count,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
}

function ringOption(data) {
  return {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        data: data.choice.map((item) => ({
          name: item.option,
          value: item.count,
        })),
      },
    ],
  }
}

function barOption(data) {
  return {
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: data.choice.map((item) => item.option),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data.choice.map((item) => item.count),
        type: 'bar',
      },
    ],
  }
}

function histogramOption(data) {
  return {
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: data.choice.map((item) => item.option),
    },
    series: [
      {
        data: data.choice.map((item) => item.count),
        type: 'bar',
      },
    ],
  }
}

function cloudOption(data) {
  return {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'wordCloud',
        sizeRange: [25, 55],
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color: function () {
            let colorSet = [
              '#FF0000',
              '#FF7F00',
              '#FFFF00',
              '#00FF00',
              '#00FFFF',
              '#0000FF',
              '#8B00FF',
            ]
            return colorSet[Math.round(Math.random() * 6)]
          },
        },
        emphasis: {
          focus: 'self',
          textStyle: {
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        data: data.choice.map((item) => ({
          name: item.option,
          value: item.count,
        })),
      },
    ],
  }
}

export default Graph
