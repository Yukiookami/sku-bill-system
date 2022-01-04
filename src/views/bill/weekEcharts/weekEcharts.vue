<!--
 * @Author: zxy
 * @Date: 2022-01-03 15:44:21
 * @LastEditTime: 2022-01-04 21:26:09
 * @FilePath: /sku-bill-system/src/views/bill/weekEcharts/weekEcharts.vue
-->
<template>
  <!-- 每周开销折线图 -->
  <div class="week-echarts-main">
    <!-- 页头 -->
    <div class="week-echarts-header flex-box-between-cneter">
      <div class="text-color-c3">
        <i class="iconfont icon-chart-area font-size-16 text-color-5c"></i>
        <span class="font-size-12 margrin-side-mini">週支出統計</span>
      </div>

      <el-date-picker
        :clearable="false"
        :default-value="new Date()"
        style="width: 152px; margin-top: 10px"
        value-format="YYYY-MM-DD"
        :format="`[${state.nowYear} 年第] ww [週]`"
        size="small"
        @change="chooseDay"
        v-model="state.nowTime"
        type="week"
      ></el-date-picker>

      <div>
        <dv-decoration-6 :color="['#50e3c2', '#67a1e5']" style="width: 100px; height: 10px" />
      </div>
    </div>
    <!-- 折线图 -->
    <div class="week-echart-sec">
      <div class="week-echart-dom" ref="weekEchart"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import * as echarts from "echarts";

const weekEchart = ref(null);

const state = reactive({
  nowTime: "",
  nowYear: "2022",
});

/**
 * @description: 初始化折线图
 * @param {*}
 * @return {*}
 */
const initWeekEchart = () => {
  const chartDom = weekEchart.value;
  const myChart = echarts.init(chartDom);

  let option = {
    grid: {
      left: "7%",
      top: "5%",
      right: "3%",
      bottom: "8%",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      axisTick: {
        show: false,
      },
      // boundaryGap: false,
      axisLine: {
        // show: false,
        lineStyle: {
          color: "#ccc",
          cap: "round",
        },
      },
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      splitLine: { show: false },
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#ccc",
        },
      },
    },
    series: [
      {
        data: [2200, 2300, 2000, 1200, 1290, 1330, 1320],
        type: "line",
        smooth: true,
        symbolSize: 8,
        lineStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#1c98e8",
                },
                {
                  offset: 1,
                  color: "#28f8de",
                },
              ],
            },
            width: 3,
          },
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(35,184,210,.2)",
              },
              {
                offset: 1,
                color: "rgba(35,184,210,0)",
              },
            ],
          },
        },
      },
    ],
  };

  option && myChart.setOption(option);
};

/**
 * @description: 设置当前年月日
 * @param {*}
 * @return {*}
 */
const initNowDate = () => {
  const date = new Date();

  let year = date.getFullYear();
  state.nowYear = year;

  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  if (month.length !== 2) {
    month = 0 + month;
  }

  if (day.length !== 2) {
    day = 0 + day;
  }

  state.nowTime = `${year}-${month}-${day}`;
};

/**
 * @description: 选择日期
 * @param {*}
 * @return {*}
 */
const chooseDay = (e) => {
  state.nowYear = e.slice(0, 4)
};

initNowDate();

onMounted(() => {
  initWeekEchart();
});
</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
@import "../../../assets/css/icon/iconfont.css";

.week-echarts-main {
  width: calc(100% - 20px);
  height: calc(100% - 30px);
  padding: 20px 10px 10px 10px;
  border-radius: 10px;

  .week-echarts-header {
    width: 100%;
    height: 5%;
  }

  .week-echart-sec {
    margin-top: 20px;
    height: calc(95% - 20px);
    width: 100%;

    .week-echart-dom {
      height: 100%;
      width: 100%;
    }
  }
}

:deep(.el-input__inner),
:deep(.el-input__count-inner) {
  border-color: $color-5c;
  background-color: rgba(0, 0, 0, 0.3) !important;
  color: $color-c3;
}
</style>
