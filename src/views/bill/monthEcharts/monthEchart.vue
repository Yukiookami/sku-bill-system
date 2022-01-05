<!--
 * @Author: zxy
 * @Date: 2022-01-03 11:50:52
 * @LastEditTime: 2022-01-05 16:08:08
 * @FilePath: /sku-bill-system/src/views/bill/monthEcharts/monthEchart.vue
-->
<template>
  <div class="month-main flex-box-between-cneter">
    <!-- 小分类占比list -->
    <div class="month-list-bord-sec">
      <div class="flex-box-between-cneter">
        <div class="text-color-c3">
          <i class="iconfont icon-tongji2 font-size-16 text-color-5c"></i>
          <span class="font-size-12 margrin-side-mini">支出(月)</span>
        </div>

        <el-date-picker
          :clearable="false"
          :default-value="new Date()"
          style="width: 105px; margin-top: 10px"
          value-format="YYYY-MM-DD"
          size="small"
          @change="chooseDay"
          v-model="state.nowTime"
          type="month"
        ></el-date-picker>
      </div>

      <dv-capsule-chart :config="state.config" class="month-list-bord" />
    </div>
    <!-- 月开销与预算 -->
    <div class="month-yosan-pay-sec">
      <!-- 开销笔数，开销总金额和预算 -->
      <div class="month-pay-box">
        <div class="pay-box flex-box-between-cneter">
          <span>当月支出回数</span>
          <dv-digital-flop
            :config="state.payConfig"
            class="text-box pay-number-box"
          />
        </div>

        <div class="flex-box-between-cneter pay-money-box-sec">
          <div class="pay-box pay-money-box">
            <span>当月支出</span>
            <dv-digital-flop :config="state.payMoneyConfig" class="text-box" />
          </div>

          <div class="pay-box pay-money-box">
            <span>预算</span>
            <dv-digital-flop
              :config="state.yosanMoneyConfig"
              class="text-box"
            />
          </div>
        </div>

        <!-- 装饰 -->
        <dv-decoration-3 style="width:100%;height:30px;" />
      </div>
      <!-- 环图，百分比 -->
      <div class="month-pay-yosan-p">
        <div class="ring-echart" ref="monthPayYosan"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import * as echarts from "echarts";
import { getFirstAndLastDayByMonth } from "../../../until/time";

const monthPayYosan = ref(null);

const props = defineProps({
  yosan: Number,
  monthDataList: Array,
  nowDate: String
})

const emit = defineEmits([
  'getMonthData'
])

const state = reactive({
  // 当前月份
  nowTime: "",
  // 配置进度条
  config: {
    data: [],
  },
  // 配置开销笔数
  payConfig: {
    number: [0],
    content: "{nt}",
    style: {
      fontSize: 18,
      fill: "#3de7c9",
    },
    textAlign: "left",
  },
  // 开销总金额
  payMoneyConfig: {
    number: [3.5],
    content: "{nt}万円",
    toFixed: 2,
    style: {
      fontSize: 18,
      fill: "#3de7c9",
    },
    textAlign: "left",
  },
  // 预算
  yosanMoneyConfig: {
    number: [10.2],
    content: "{nt}万円",
    toFixed: 2,
    style: {
      fontSize: 18,
      fill: "#3de7c9",
    },
    textAlign: "left",
  },
});

/**
 * @description: 设置当前年月
 * @param {*}
 * @return {*}
 */
const initNowDate = () => {
  const date = new Date();
  let month = (date.getMonth() + 1).toString();

  if (month.length !== 2) {
    month = 0 + month;
  }

  state.nowTime = `${date.getFullYear()}-${month}-01`;
};

/**
 * @description: 选择时间
 * @param {*}
 * @return {*}
 */
const chooseDay = (e) => {
  const { startDay, lastDay } = getFirstAndLastDayByMonth(new Date(e))
  
  emit('getMonthData', startDay, lastDay, e, true)
};

/**
 * @description: 初始化环图
 * @param {*}
 * @return {*}
 */
const initYosanEcharts = () => {
  const chartDom = monthPayYosan.value;
  const myChart = echarts.init(chartDom);

  let value = state.payMoneyConfig.number[0] / state.yosanMoneyConfig.number[0]

  if (state.payMoneyConfig.number[0] > state.yosanMoneyConfig.number[0]) {
    value = 100
  } else {
    value = ((state.payMoneyConfig.number[0] / state.yosanMoneyConfig.number[0]) * 100).toFixed(2)
  }

  let option = {
    title: {
      text: value + "%",
      x: "center",
      y: "center",
      textStyle: {
        color: "#3fc0fb",
        fontSize: 16,
      },
    },
    series: [
      {
        type: "pie",
        radius: ["75%", "80%"],
        center: ["50%", "50%"],
        hoverAnimation: false,
        color: ["#00bcd44a", "transparent"],
        label: {
          normal: {
            show: false,
          },
        },
        data: [
          {
            value: value,
            itemStyle: {
              normal: {
                color: "#03a9f4",
                shadowBlur: 10,
                shadowColor: "#97e2f5",
              },
            },
          },
          {
            value: 100 - value,
          },
        ],
      },
    ],
  };

  option && myChart.setOption(option);
};

/**
 * @description: 初始化预算
 * @param {*}
 * @return {*}
 */
const initYosanBord = (val) => {
  state.yosanMoneyConfig.number[0] = val / 10000

  state.yosanMoneyConfig = {...state.yosanMoneyConfig}
}

/**
 * @description: 初始化面板
 * @param {*}
 * @return {*}
 */
const initNumberBord = (data) => {
  // 数字面板数据
  let monthPayMoney = 0
  let payCount = data.length

  // 类型数据
  let typeList = []
  let series = []

  // 生成类型数据
  data.forEach(ele => {
    monthPayMoney += ele.payMoney

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

  state.config.data = series
  state.config = {...state.config}

  state.payConfig.number[0] = payCount
  state.payConfig = {...state.payConfig} 

  state.payMoneyConfig.number[0] = monthPayMoney / 10000
  state.payMoneyConfig = {...state.payMoneyConfig} 

  state.nowTime = props.nowDate

  initYosanEcharts()
}

// 监听预算
watch(() => props.yosan, val => {
  initYosanBord(val)
})
// 监听月数据
watch(() => props.monthDataList, val => {
  initNumberBord(val)
})

initNowDate();
initYosanBord(props.yosan)

onMounted(() => {
  initNumberBord(props.monthDataList)
})
</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
@import "../../../assets/css/icon/iconfont.css";
.month-main {
  width: calc(100% - 20px);
  height: calc(100% - 30px);
  padding: 20px 10px 10px 10px;
  border-radius: 10px;
}

.month-list-bord-sec {
  width: 60%;
  height: 100%;
  .month-list-bord {
    height: 80%;
    width: 100%;
  }
}

.month-yosan-pay-sec {
  display: flex;
  flex-direction: column;
  width: 37%;
  height: 100%;

  .month-pay-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;
  }
}

.pay-box {
  color: $color-25;
  font-weight: 700;
  background-color: $color-bg;
  padding: 10px;
  border-radius: 5px;
  width: calc(100% - 20px);
  margin-bottom: 3px;
}

.pay-money-box-sec {
  width: 100%;
  .pay-money-box {
    width: 42%;
  }
}

.text-box {
  width: 80px;
  height: 30px;
}

.pay-number-box {
  width: 40px;
}

// 环图
.month-pay-yosan-p {
  height: 50%;
  width: 100%;

  .ring-echart {
    height: 100%;
    width: 100%;
  }
}

:deep(.capsule-container) {
  justify-content: flex-start;
}

:deep(.label-column) {
  justify-content: flex-start;
}

// 是否显示底部数字
:deep(.unit-label) {
  display: none;
}

:deep(.el-input__inner),
:deep(.el-input__count-inner) {
  border-color: $color-5c;
  background-color: rgba(0, 0, 0, 0.3) !important;
  color: $color-c3;
}
</style>
