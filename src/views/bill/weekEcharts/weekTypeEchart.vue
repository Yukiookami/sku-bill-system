<!--
 * @Author: zxy
 * @Date: 2022-01-03 17:03:47
 * @LastEditTime: 2022-01-05 13:26:20
 * @FilePath: /sku-bill-system/src/views/bill/weekEcharts/weekTypeEchart.vue
-->
<template>
  <div class="week-type-echarts-main">
    <!-- 头部 -->
    <div class="week-type-echarts-header flex-box-between-cneter">
      <div class="text-color-c3">
        <i class="iconfont icon-chart-area font-size-16 text-color-5c"></i>
        <span class="font-size-12 margrin-side-mini">支出タイプ（週）</span>
      </div>

      <div>
        <dv-decoration-1 style="width: 100px; height: 15px" />
      </div>
    </div>

    <div class="week-type-echarts">
      <div class="week-type-echart-dom" ref="weekTypeChart"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import * as echarts from "echarts";

const weekTypeChart = ref(null)

const props = defineProps({
  weekDataList: Array
})

const state = reactive({
  seriesData: [],
  xData: []
})

/**
 * @description: 初始化饼图的数据
 * @param {*}
 * @return {*}
 */
const initPieData = (data) => {
  let typeList = []
  let series = []

  data.forEach(ele => {
    let oyaType = ele.type.split('/')[0]
    let type = oyaType === 'その他' ? oyaType : ele.type.split('/')[1]

    if (typeList.some(item => item === type)) {
      let index = series.findIndex(item => item.name === type)

      series[index].value += ele.payMoney
    } else {
      typeList.push(type)
      series.push({
        name: type,
        value: ele.payMoney
      })
    }
  })

  state.seriesData = series
  state.xData = typeList
}

/**
 * @description: 初始化饼图
 * @param {*}
 * @return {*}
 */
const initWeekTypeEchart = () => {
  const chartDom = weekTypeChart.value;
  const myChart = echarts.init(chartDom);

  let option = {
    color: [
      '#37a2da',
      '#32c5e9',
      '#9fe6b8',
      '#ffdb5c',
      '#ff9f7f',
      '#fb7293',
      '#e7bcf3',
      '#8378ea'
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    toolbox: {
      show: true
    },
    calculable: true,
    legend: {
      orient: 'horizontal',
      icon: 'circle',
      bottom: 0,
      x: 'center',
      data: state.xData,
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '通过率统计',
        type: 'pie',
        stillShowZeroSum: false,
        radius: [10, 50],
        roseType: 'area',
        center: ['50%', '40%'],
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: true,
          color: "#fff",
        },
        emphasis: {
          label: {
            show: false
          }
        },
        data: state.seriesData
      }
    ]
  }

  option && myChart.setOption(option);
}

// 监听周数据变化
watch(() => props.weekDataList, val => {
  initPieData(val)
  initWeekTypeEchart()
})

// 初始化数据
initPieData(props.weekDataList)

onMounted(() => {
  initWeekTypeEchart()
})
</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
@import "../../../assets/css/icon/iconfont.css";

.week-type-echarts-main {
  width: calc(100% - 20px);
  height: calc(100% - 30px);
  padding: 20px 10px 10px 10px;
  border-radius: 10px;

  .week-type-echarts-header {
    width: 100%;
    height: 10px;
  }

  .week-type-echarts {
    height: calc(90% - 10px);
    width: 100%;

    .week-type-echart-dom {
      height: 100%;
      width: 100%;
    }
  }
}
</style>