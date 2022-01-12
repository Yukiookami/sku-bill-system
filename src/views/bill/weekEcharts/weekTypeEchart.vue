<!--
 * @Author: zxy
 * @Date: 2022-01-03 17:03:47
 * @LastEditTime: 2022-01-12 20:06:21
 * @FilePath: /sku-bill-system/src/views/bill/weekEcharts/weekTypeEchart.vue
-->
<template>
  <div class="week-type-echarts-main">
    <!-- 头部 -->
    <div class="week-type-echarts-header flex-box-between-cneter">
      <div class="text-color-c3">
        <i class="iconfont icon-chart-area font-size-16 text-color-5c"></i>
        <span 
        @click="changeBordData"
        class="font-size-12 margrin-side-mini hover">{{ state.bordTitle }}</span>
      </div>

      <div>
        <dv-decoration-1 style="width: 100px; height: 15px" />
      </div>
    </div>

    <div class="flip-container">
      <div class="flipper"
      :class="{'flipper-change': !state.isWeek}">
        <!-- 周类型 -->
        <div class="week-type-echarts front">
          <div class="week-type-echart-dom" ref="weekTypeChart"></div>
        </div>
        <!-- 月类型 -->
        <div class="month-type-echarts back">
          <div class="month-type-echart-dom" ref="monthTypeChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import * as echarts from "echarts";

const weekTypeChart = ref(null)
const monthTypeChart = ref(null)

const props = defineProps({
  weekDataList: Array,
  monthDataList: Array
})

const state = reactive({
  seriesData: [],
  xData: [],
  // 当前是否为周统计
  isWeek: true,
  // 标题
  bordTitle: computed(() => state.isWeek ? '支出タイプ（週）' : '支出タイプ（月）'),
  // 是否不为第一次加载月数据
  hasMonth: false
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
  const chartDom = state.isWeek ? weekTypeChart.value : monthTypeChart.value;

  const myChart = echarts.init(chartDom);

  !state.isWeek ? state.hasMonth = true : false

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

// 监听月数据变化
watch(() => props.monthDataList, val => {
  initPieData(val)
  initWeekTypeEchart()
})

// 初始化数据
initPieData(props.weekDataList)

onMounted(() => {
  initWeekTypeEchart()
})

/**
 * @description: 切换周/月数据
 * @param {*}
 * @return {*}
 */
const changeBordData = () => {
  state.isWeek = !state.isWeek

  if (!state.hasMonth) {
    initPieData(props.monthDataList)
    initWeekTypeEchart()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
@import "../../../assets/css/icon/iconfont.css";
@import "../../../assets/css/anime.scss";

.week-type-echarts-main {
  width: calc(100% - 20px);
  height: calc(100% - 30px);
  padding: 20px 10px 10px 10px;
  border-radius: 10px;

  .week-type-echarts-header {
    width: 100%;
    height: 10px;
  }

  .week-type-echarts,
  .month-type-echarts {
    height: calc(90% - 10px);
    width: 100%;

    .month-type-echart-dom,
    .week-type-echart-dom {
      height: 100%;
      width: 100%;
    }
  }
}

// 反转动画
.flip-container {
	perspective: 1000px;
  height: 90%;
}

.flipper {
  height: 100%;
	transition: 0.6s;
	transform-style: preserve-3d;
// transform: rotateY(180deg);
	position: relative;
}

.flipper-change {
  transform: rotateY(180deg) !important;
}

.front, .back {
	backface-visibility: hidden;

	position: absolute;
	top: 0;
	left: 0;
}

.front {
	z-index: 2;
	transform: rotateY(0deg);
}

.back {
	transform: rotateY(180deg);
}
</style>