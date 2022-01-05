<!--
 * @Author: zxy
 * @Date: 2022-01-01 19:42:03
 * @LastEditTime: 2022-01-05 14:57:01
 * @FilePath: /sku-bill-system/src/views/bill/billSystem.vue
-->
<template>
  <div class="bill-system-main">
    <div class="bill-system-content-main">
      <IsLoading :is-loading="state.isLoading">
        <template #content>
          <!-- 页头 -->
          <div class="flex-box-between-start bill-system-header">
            <dv-decoration-10 class="dv-dec-10" />
            <div class="flex-box-between-cneter bill-system-title-sec">
              <dv-decoration-8 class="dv-dec-8" :color="['#568aea', '#000000']" />
              <div class="title">
                <span class="title-text text-color-c3 ">Sku 家計簿</span>
                <dv-decoration-6
                  class="dv-dec-6"
                  :reverse="true"
                  :color="['#50e3c2', '#67a1e5']"
                />
              </div>
              <dv-decoration-8
                class="dv-dec-8"
                :reverse="true"
                :color="['#568aea', '#000000']"
              />
            </div>
            <dv-decoration-10 class="dv-dec-10-s" />

            <div class="bill-system-loginout" @click="userLoginout">
              <div class="submit-button">
                <i class="iconfont icon-diagnose text-color-5c"></i>
                ログアウト
              </div>
            </div>
          </div>
          <!-- 第一层数据 -->
          <div class="flex-box-between-cneter bill-system-first">
            <!-- 年统计图 -->
            <div class="bill-system-year-echart">
              <YearEcharts :nowYear="state.nowYear"
              :showYear="state.showYear"
              :yearData="state.yearData"
              @changeYear="changeYear"></YearEcharts>
            </div>

            <!-- 开销的操作 -->
            <div class="bill-system-add-new-pay">
              <dv-border-box-1>
                <AddNewPay 
                :yosan="state.yosan"
                @getWeekData="getWeekData"
                @changeYosan="changeYosan"></AddNewPay>
              </dv-border-box-1>
            </div>

            <!-- 开销list -->
            <div class="bill-system-pay-list">
              <dv-border-box-13>
                <PayList :weekDataList="state.weekDataList"
                :nowDate="state.nowDate"
                @getWeekData="getWeekData"></PayList>
              </dv-border-box-13>
            </div>
          </div>
          <!-- 第二层数据 -->
          <div class="flex-box-between-cneter bill-system-sec">
            <!-- 月开销 -->
            <div class="bill-system-month-echart">
              <dv-border-box-13>
                <MonthEchart :yosan="state.yosan"></MonthEchart>
              </dv-border-box-13>
            </div>

            <!-- 周开销类型分布 -->
            <div class="bill-system-week-type-echart">
              <dv-border-box-12>
                <WeekTypeEchart :weekDataList="state.weekDataList"></WeekTypeEchart>
              </dv-border-box-12>
            </div>

            <!-- 周开销 -->
            <div class="bill-system-week-echart">
              <dv-border-box-12>
                <WeekEcharts :weekDataList="state.weekDataList"
                :nowDate="state.nowDate"
                @getWeekData="getWeekData"></WeekEcharts>
              </dv-border-box-12>
            </div>
          </div>
        </template>
      </IsLoading>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "@vue/reactivity";
// loading
import IsLoading from "../../components/loading/isLoading.vue";
// 年统计
import YearEcharts from "./yearEcharts/yearEcharts.vue";
// 新增开销和登录预算
import AddNewPay from "./pay/addNewPay.vue";
// 开销面板(周为单位)
import PayList from "./pay/payList.vue";
// 当月开销
import MonthEchart from "./monthEcharts/monthEchart.vue";
// 周类型
import WeekTypeEchart from "./weekEcharts/weekTypeEchart.vue";
// 周开销
import WeekEcharts from "./weekEcharts/weekEcharts.vue";
import storage from "../../until/storage";
import { goToPage } from "../../until";
import { httpGetPayDataByTimeAndType } from "../../request/pay/pay";
import { getFirstAndLastDayByWeek, getNowDate } from "../../until/time";
import axios from "axios";
import { httpGetUserInfo } from "../../request/user/user";

const state = reactive({
  userId: '',
  username: '',
  // todo 在请求时变动 是否正在加载
  isLoading: false,
  // 年份数据请求
  // 今年
  nowYear: computed(() => {
    const date = new Date();
    return +date.getFullYear();
  }),
  // 当前选择的时间
  showYear: 2022,
  yearData: [],
  // 年份数据请求end

  // 周数据请求
  // 用于渲染的周数据
  weekDataList: [],
  // 当前的日期（用于获得更新和删除）
  nowDate: '',
  // 周数据请求end

  // 预算
  yosan: 0
})

/**
 * @description: 用户登出
 * @param {*}
 * @return {*}
 */
const userLoginout = () => {
  storage.clearItem('bill_token')
  storage.clearItem('user_info')
  goToPage('/login')
}

/**
 * @description: 修改预算
 * @param {*}
 * @return {*}
 */
const changeYosan = (data) => {
  state.yosan = data
}

/**
 * @description: 获得周的数据
 * @param {*}
 * @return {*}
 */
const getWeekData = async (startDay, lastDay, nowDate) => {
  try {
    state.nowDate = nowDate
    const res = await httpGetPayDataByTimeAndType('', startDay, lastDay)

    res.data ? state.weekDataList = res.data : null
  } catch (err) {
    console.log(err)
  }
}

/**
 * @description: 更改年份
 * @param {*}
 * @return {*}
 */
const changeYear = (year) => {
  state.showYear = year
  getDataInYear()
}

/**
 * @description: 获得一年的开销
 * @param {*}
 * @return {*}
 */
const getDataInYear = async () => {
  try {
    const { data } = await httpGetPayDataByTimeAndType('', `${state.nowYear}-01-01`, `${state.nowYear + 1}-01-01`)

    state.yearData = data
  } catch (err) {
    console.log(err)
  }
} 

/**
 * @description: 获得当前userinfo
 * @param {*}
 * @return {*}
 */
const getNowUser = async () => {
  try {
    const { userId, username } = storage.getItem('user_info')
    
    state.userId = userId
    state.username = username

    const { data } = await httpGetUserInfo(userId)

    state.yosan = data.budget
  } catch (err) {
    console.log(err)
  }
}

/**
 * @description: 获取当前时间并且请求数据
 * @param {*}
 * @return {*}
 */
const sendHttp = async () => {
  try {
    state.isLoading = true
    // 获取周数据
    let { startDay, lastDay } = getFirstAndLastDayByWeek(new Date(getNowDate())) 

    await axios.all([
      getWeekData(startDay, lastDay, getNowDate()),
      getDataInYear(),
      getNowUser()
    ])
    state.isLoading = false
  } catch (err) {
    console.log(err)
  }
}

sendHttp()
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';
@import '../../assets/css/index.scss';

.bill-system-main {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, .9);

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    background-image: url('../../assets/img/back/IMG_2554.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -1;
    background-color: rgba(0, 0, 0, 1);
  }

  .bill-system-content-main {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    padding: 10px;

    //　header
    .bill-system-header {
      position: relative;
      height: 70px;
      padding-top: 30px;

      .bill-system-title-sec {
        width: 30%;
      }

      .bill-system-loginout {
        position: absolute;
        right: 10px;
        bottom: 30px;
        height: 20px;
      }
    }

    // 第一层数据
    .bill-system-first {
      height: $firHeight;
      min-height: $minfirHeight;
      // 年度
      .bill-system-year-echart {
        width: calc(100% - 380px - 420px);
        height: 100%;
      }
  
      // 新增开销和登录预算
      .bill-system-add-new-pay {
        width: 380px;
        height: 100%;
      }

      .bill-system-pay-list {
        width: 420px;
        height: 100%;
      }

    }
    // 第二层数据
    .bill-system-sec {
      height: $secHeight;
      min-height: $minsecHeight;
      .bill-system-month-echart {
        width: 600px;
        height: 100%;
      }

      .bill-system-week-type-echart {
        width: 300px;
        height: 100%;
      }

      .bill-system-week-echart {
        width: calc(100% - 600px - 300px);
        height: 100%;
      }
    }
  }
}

::-webkit-scrollbar {
  display: none;
}

.submit-button {
  display: block;
  padding: 5px 15px;
  border: 1px solid $color-5c;
  border-radius: 5px;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.3) !important;
  color: $color-c3;
  cursor: pointer;
}
</style>