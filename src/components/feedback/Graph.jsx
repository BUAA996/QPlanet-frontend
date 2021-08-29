import { makeStyles } from '@material-ui/core/styles'
import * as echarts from 'echarts/core'
import { BarChart, PieChart, RadarChart, HeatmapChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  VisualMapComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useEffect } from 'react'
import { useRef } from 'react'
import 'echarts-wordcloud'

echarts.use([
  HeatmapChart,
  RadarChart,
  PieChart,
  GridComponent,
  BarChart,
  CanvasRenderer,
  TooltipComponent,
  ToolboxComponent,
  VisualMapComponent,
])

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
    else if (type === 6) option = radarOption(data)
    else if (type === 7) option = heatOption(data)

    chart.setOption(option, true)
  }, [type, data])

  return <div className={classes.root} ref={ref}></div>
}

function pieOption(data) {
  return {
    tooltip: {
      trigger: 'item',
    },
    toolbox: {
      show: true,
      right: '5%',
      feature: {
        saveAsImage: { title: '保存为图片', name: data.title + '-饼状图' },
      },
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
    toolbox: {
      show: true,
      right: '5%',
      feature: {
        saveAsImage: { title: '保存为图片', name: data.title + '-圆环图' },
      },
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
    toolbox: {
      show: true,
      right: '5%',
      feature: {
        saveAsImage: { title: '保存为图片', name: data.title + '-柱状图' },
      },
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
    toolbox: {
      show: true,
      right: '5%',
      feature: {
        saveAsImage: { title: '保存为图片', name: data.title + '-条形图' },
      },
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
    toolbox: {
      show: true,
      right: '5%',
      feature: {
        saveAsImage: { title: '保存为图片', name: data.title + '-词云图' },
      },
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

function radarOption(data) {
  return {
    tooltip: {
      trigger: 'item',
    },
    toolbox: {
      show: true,
      right: '5%',
      feature: {
        saveAsImage: { title: '保存为图片', name: data.title + '-雷达图' },
      },
    },
    radar: {
      indicator: data.choice.map((item) => {
        return {
          name: item.option,
          max: Math.max(...data.choice.map((item) => item.count)),
        }
      }),
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: data.choice.map((item) => item.count),
          },
        ],
      },
    ],
  }
}

// 该函数只能对二维数据使用
function heatOption(data) {
  return {
    tooltip: {
      trigger: 'item',
    },
    toolbox: {
      show: true,
      right: '5%',
      feature: {
        saveAsImage: { title: '保存为图片', name: data.title + '-雷达图' },
      },
    },
    xAxis: {
      type: 'category',
      data: data.horizontal,
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: data.vertical,
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: Math.max(...data.choice.map((item) => item.count)),
      calculable: true,
      orient: 'horizontal',
      left: 'center',
    },
    series: [
      {
        type: 'heatmap',
        data: data.data,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
}

export default Graph
