import React from 'react'
import ReactEcharts from 'echarts-for-react'; 


export const Chart = props => {
  

    return props.data.stats.series !== undefined ? (<>
    <ReactEcharts
                  type="Line"
                  option={ {
    
                    title: {
                        text: 'Data'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['Total Cases', 'New Cases', 'Total Deaths']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: props.data.stats.labels
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                        }
                    ],
                    series: [
                      
                        {
                            name: 'New Cases',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: props.data.statsNewCases[0]
                        },
                       
                        {
                            name: 'Total Cases',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: props.data.statsTotalCases[0]
                        }, {
                            name: 'Total Deaths',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: props.data.stats.series[0]
                        }
                    ]
                }}
                />
     </>) : ""
}
