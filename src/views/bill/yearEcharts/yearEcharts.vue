<!--
 * @Author: zxy
 * @Date: 2022-01-01 21:28:20
 * @LastEditTime: 2022-01-06 09:49:07
 * @FilePath: /sku-bill-system/src/views/bill/yearEcharts/yearEcharts.vue
-->
<template>
  <div>
    <dv-border-box-12>
      <div class="year-main">
        <div class="year-select flex-box-center-center">
          <div
            class="year-sel-box padding-side-mini text-color-c3 font-size-12 flex-box-center-center"
          >
            <div class="user-select-no info-bord">
              <i
                class="iconfont icon-chart-area text-color-5c font-size-18"
              ></i>
              {{ state.yaerText }} (総計: {{ state.yaerMoney }} 円)
            </div>

            <div class="font-bold flex-box-y-center font-size-16">
              <el-icon @click="changeYear(-1)" class="cursor-pointer"
                ><arrow-left-bold
              /></el-icon>

              <span class="margrin-side-big user-select-no">{{
                state.showYear
              }}</span>

              <el-icon @click="changeYear(1)" class="cursor-pointer"
                ><arrow-right-bold
              /></el-icon>
            </div>
            <!-- 圆环 -->
            <div class="year-type-data">
              <div ref="yearRingDorker"></div>
            </div>
          </div>
        </div>
        <!-- 折线图 -->
        <div class="year-doker" ref="yearEchartsDoker"></div>
      </div>
    </dv-border-box-12>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import axios from "axios";
import * as echarts from "echarts";
import { httpGetPayDataByTimeAndType } from "../../../request/pay/pay";

const yearEchartsDoker = ref(null);
const yearRingDorker = ref(null);

const props = defineProps({
  nowYear: Number,
  showYear: Number,
  yearData: Array
})

const emit = defineEmits([
  'changeYear'
])

const state = reactive({
  // 当前选择的时间
  showYear: 2022,
  // 当前显示的文字
  yaerText: "年次統計",
  // 是否选择时间
  pickYear: false,
  // 一年的总开销
  yaerMoney: 0,
  // 年度折线图显示的时间表
  category: [],
  // 年度总消费
  lineData: [],
  // 年度生活开销
  barData: [],
  // 饼图
  pieData: []
});

/**
 * @description: 更改时间
 * @param {number} flag 加或者减时间
 * @return {*}
 */
const changeYear = (flag) => {
  state.showYear += flag;
  state.pickYear = false;

  emit('changeYear', state.showYear)
};

/**
 * @description: 生成类型统计图
 * @param {*}
 * @return {*}
 */
const initYearRing = () => {
  const DomItem = yearRingDorker.value;

  const myChart = echarts.init(DomItem);

  let option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        stillShowZeroSum: false,
        itemStyle: {
          borderRadius: 5,
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "10",
            fontWeight: "bold",
            color: "#fff"
          },
        },
        labelLine: {
          show: false,
        },
        data: state.pieData
      },
    ],
  };

  option && myChart.setOption(option);
};

/**
 * @description: 生成年度统计图表
 * @param {*}
 * @return {*}
 */
const initYearEcharts = () => {
  const DomItem = yearEchartsDoker.value;

  const myChart = echarts.init(DomItem);

  // option
  let option = {
    grid: {
      left: "8%",
      top: "5%",
      right: "2%",
      bottom: "8%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["支出", "生活費"],
      textStyle: {
        color: "#ccc",
      },
    },
    xAxis: {
      axisTick: {
        show: false,
      },
      splitNumber: 12,
      splitLine: {
        show: false,
        interval: "0",
      },
      data: state.category,
      axisLine: {
        // show: false,
        lineStyle: {
          color: "#ccc",
          cap: "round",
        },
      },
    },
    yAxis: {
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          color: "#ccc",
        },
      },
    },
    series: [
      {
        name: "支出",
        type: "line",
        smooth: true,
        showAllSymbol: true,
        symbol: "emptyCircle",
        symbolSize: 15,
        data: state.lineData,
      },
      {
        name: "生活費",
        type: "bar",
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#14c8d4" },
            { offset: 1, color: "#43eec6" },
          ]),
        },
        data: state.barData,
      },
      // {
      //   name: "bar",
      //   type: "bar",
      //   barGap: "-100%",
      //   barWidth: 10,
      //   itemStyle: {
      //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       { offset: 0, color: "rgba(20,200,212,0.5)" },
      //       { offset: 0.2, color: "rgba(20,200,212,0.2)" },
      //       { offset: 1, color: "rgba(20,200,212,0)" },
      //     ]),
      //   },
      //   z: -12,
      //   data: lineData,
      // },
      // 消费比例
      {
        name: "总消费",
        type: "pictorialBar",
        symbol: "rect",
        itemStyle: {
          color: "#0f375f",
        },
        symbolRepeat: true,
        symbolSize: [12, 4],
        symbolMargin: 1,
        z: -10,
        data: state.lineData,
      },
    ],
  };

  option && myChart.setOption(option);
};

/**
 * @description: 处理获得的年数据
 * @param {*} data
 * @return {*}
 */
const initYearData = (data) => {
  // 一年的总开销
  let yaerMoney = 0
  // 饼图数据
  let typeList = []
  let series = []
  // 折线图数据
  state.lineData = [...new Array(12).fill(0)]
  state.barData = [...new Array(12).fill(0)]

  let cateCont = 0
  state.category = state.lineData.map(ele => {
    if (cateCont++ < 10) {
      return `${props.showYear}-0${cateCont}`
    } else {
      return `${props.showYear}-${cateCont}`
    }
  }) 

  let allData = state.lineData
  let lifeData = state.barData

  data.forEach(ele => {
    yaerMoney += ele.payMoney
    let type = ele.type.split('/')[0]

    // 折线图数据
    let index = state.category.findIndex(item => {
      return ele.payTime.slice(0, 7) === item
    })

    if (index !== -1) {
      allData[index] += ele.payMoney

      if (type === '生活費') {
        lifeData[index] += ele.payMoney
      }
    }

    // 饼图数据
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

  state.pieData = series
  state.yaerMoney = yaerMoney

  initYearEcharts()
  initYearRing()
}

/**
 * @description: 获得一年的开销
 * @param {*}
 * @return {*}
 */
// const getDataInYear = async () => {
//   try {
//     const { data } = await httpGetPayDataByTimeAndType('', `${state.showYear}-01-01`, `${state.showYear + 1}-01-01`)

//     initYearData(data)
//   } catch (err) {
//     console.log(err)
//   }
// } 

/**
 * @description: 监听年数据变化
 * @param {*}
 * @return {*}
 */
watch(() => props.yearData, val => {
  state.showYear = props.showYear
  initYearData(val)
})

state.showYear = props.nowYear;

onMounted(() => {
  initYearData(props.yearData)
});
</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
@import "../../../assets/css/icon/iconfont.css";
.year-main {
  width: 100%;
  height: $firHeight;
  min-height: $minfirHeight;

  .year-select {
    width: 100%;
    height: 18%;

    .year-sel-box {
      position: relative;
      width: 100%;
      .info-bord {
        position: absolute;
        left: 20px;
        top: -10px;
      }

      .year-type-data {
        position: absolute;
        right: 0px;
        top: -30px;
        z-index: 99;

        width: 150px;
        height: 150px;

        div {
          height: 100%;
          width: 100%;
        }
      }
    }

    .year-piker-box {
      position: relative;

      .pick-year-input {
        width: 50px;
        background-color: rgba(0, 0, 0, 0);
        color: #fff;
        border: none;

        &:focus {
          outline: none;
        }
      }
    }
  }
  .year-doker {
    width: 100%;
    height: 80%;
  }
}
</style>
