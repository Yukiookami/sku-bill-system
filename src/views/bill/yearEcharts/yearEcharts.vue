<!--
 * @Author: zxy
 * @Date: 2022-01-01 21:28:20
 * @LastEditTime: 2022-01-03 14:08:26
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
              {{ state.yaerText }}
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
import { onMounted } from "@vue/runtime-core";
import * as echarts from "echarts";

const yearEchartsDoker = ref(null);
const yearRingDorker = ref(null);

const state = reactive({
  // 今年
  nowYear: computed(() => {
    const date = new Date();
    return +date.getFullYear();
  }),
  // 当前选择的时间
  showYear: 2022,
  // 当前显示的文字
  yaerText: "年次統計",
  // 是否选择时间
  pickYear: false,
});

/**
 * @description: 更改时间
 * @param {number} flag 加或者减时间
 * @return {*}
 */
const changeYear = (flag) => {
  state.showYear += flag;
  state.pickYear = false;
};

/**
 * @description: 生成类型统计图
 * @param {*}
 * @return {*}
 */
const initYearRing = () => {
  const DomItem = yearRingDorker.value;

  const myChart = echarts.init(DomItem);

  const data = [
    {
      name: "生活费",
      value: 30,
    },
    {
      name: "游戏",
      value: 40,
    },
    {
      name: "交通费",
      value: 20,
    },
    {
      name: "其他",
      value: 10,
    },
  ]

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
        data: data
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

  // Generate data
  // 时间
  let category = [
    "2021-1",
    "2021-2",
    "2021-3",
    "2021-4",
    "2021-5",
    "2021-6",
    "2021-7",
    "2021-8",
    "2021-9",
    "2021-10",
    "2021-11",
    "2021-12",
  ];

  // 总消费
  let lineData = [
    160000, 180000, 140000, 120000, 170000, 200000, 210000, 140000, 190000,
    160000, 100000, 130000,
  ];
  // 生活开销
  let barData = [
    160000, 80000, 40000, 10000, 70000, 50000, 10000, 40000, 90000, 60000,
    50000, 30000,
  ];

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
      data: ["总消费", "生活开销"],
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
      data: category,
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
        data: lineData,
      },
    ],
  };

  option && myChart.setOption(option);
};

onMounted(() => {
  initYearEcharts();
  initYearRing();
  state.showYear = state.nowYear;
});
</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
@import "../../../assets/css/icon/iconfont.css";
.year-main {
  width: 100%;
  height: 40.5vh;

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
