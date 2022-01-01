<!--
 * @Author: zxy
 * @Date: 2022-01-01 21:28:20
 * @LastEditTime: 2022-01-01 22:11:26
 * @FilePath: /sku-bill-system/src/views/bill/yearEcharts/yearEcharts.vue
-->
<template>
  <div>
    <dv-border-box-12>
      <div class="year-doker" ref="yearEchartsDoker"></div>
    </dv-border-box-12>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import * as echarts from "echarts";

const yearEchartsDoker = ref(null);

/**
 * @description: 生成年度统计图表
 * @param {*}
 * @return {*}
 */
const initYearEcharts = () => {
  const DomItem = yearEchartsDoker.value;

  const myChart = echarts.init(DomItem);

  // Generate data
  // 时间
  let category = [
    '2021-1', 
    '2021-2', 
    '2021-3', 
    '2021-4', 
    '2021-5', 
    '2021-6', 
    '2021-7', 
    '2021-8', 
    '2021-9', 
    '2021-10', 
    '2021-11', 
    '2021-12'];

  // 总消费
  let lineData = [
    160000,
    180000,
    140000,
    120000,
    170000,
    200000,
    210000,
    140000,
    190000,
    160000,
    100000,
    130000];
  // 生活开销
  let barData = [160000,
    80000,
    40000,
    10000,
    70000,
    50000,
    10000,
    40000,
    90000,
    60000,
    50000,
    30000];

  // option
  let option = {
    grid: {
      left: '7%',
      top: '5%',
      right: '1%',
      bottom: '6%'
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["总消费", "生活开销"],
      textStyle: {
        color: "#ccc",
      },
    },
    xAxis: {
      axisTick: {
        show: false
      },
      splitNumber: 12,
      splitLine: { 
        show: false,
        interval: '0'
      },
      data: category,
      axisLine: {
        // show: false,
        lineStyle: {
          color: "#ccc",
          cap: 'round'
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
        name: "总消费",
        type: "line",
        smooth: true,
        showAllSymbol: true,
        symbol: "emptyCircle",
        symbolSize: 15,
        data: lineData,
      },
      {
        name: "生活开销",
        type: "bar",
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#14c8d4" },
            { offset: 1, color: "#43eec6" },
          ]),
        },
        data: barData,
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
        name: "生活消费占比",
        type: "pictorialBar",
        symbol: "rect",
        itemStyle: {
          color: "#0f375f",
        },
        symbolRepeat: true,
        symbolSize: [12, 4],
        symbolMargin: 1,
        z: -10,
        data: lineData,
      },
    ],
  };

  option && myChart.setOption(option);
};

onMounted(() => {
  initYearEcharts()
})
</script>

<style lang="scss" scoped>
.year-doker {
  width: 100%;
  height: 500px;
}
</style>
