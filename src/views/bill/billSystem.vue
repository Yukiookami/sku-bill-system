<!--
 * @Author: zxy
 * @Date: 2022-01-01 19:42:03
 * @LastEditTime: 2022-01-02 19:01:29
 * @FilePath: /sku-bill-system/src/views/bill/billSystem.vue
-->
<template>
  <div class="bill-system-main">
    <div class="bill-system-content-main">
      <IsLoading :is-loading="state.isLoading">
        <template #content>
          <!-- 第一层数据 -->
          <div class="flex-box-between-cneter bill-system-first">
            <!-- 年统计图 -->
            <div class="bill-system-year-echart">
              <YearEcharts></YearEcharts>
            </div>

            <!-- 开销的操作 -->
            <div class="bill-system-add-new-pay">
              <dv-border-box-1>
                <AddNewPay></AddNewPay>
              </dv-border-box-1>
            </div>

            <!-- 开销list -->
            <div class="bill-system-pay-list">
              <dv-border-box-13>
                <PayList></PayList>
              </dv-border-box-13>
            </div>
          </div>
          <!-- 第二层数据 -->
          <div class="flex-box-between-cneter">
            <!-- 月开销 -->
            <div>

            </div>

            <!-- 周开销 -->
            <div>
              
            </div>
          </div>
        </template>
      </IsLoading>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
// loading
import IsLoading from "../../components/loading/isLoading.vue";
// 年统计
import YearEcharts from "./yearEcharts/yearEcharts.vue";
// 新增开销和登录预算
import AddNewPay from "./pay/addNewPay.vue";
// 开销面板(周为单位)
import PayList from "./pay/payList.vue";

const state = reactive({
  // todo 在请求时变动 是否正在加载
  isLoading: false,
})
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

.bill-system-main {
  height: 100vh;
  width: 100vw;
  background-image: url('../../assets/img/back/IMG_2549.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(0, 0, 0, 1);

  .bill-system-content-main {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    padding: 10px;
    background-color: rgba(0, 0, 0, .8);

    // 第一层数据
    .bill-system-first {
      height: 40.5vh;
      // 年度
      .bill-system-year-echart {
        width: 50%;
        height: 100%;
      }
  
      // 新增开销和登录预算
      .bill-system-add-new-pay {
        width: 24%;
        height: 100%;
      }

      .bill-system-pay-list {
        width: 24%;
        height: 100%;
      }
    }
  }
}
</style>