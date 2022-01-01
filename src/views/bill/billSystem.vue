<!--
 * @Author: zxy
 * @Date: 2022-01-01 19:42:03
 * @LastEditTime: 2022-01-01 21:34:06
 * @FilePath: /sku-bill-system/src/views/bill/billSystem.vue
-->
<template>
  <div class="bill-system-main">
    <div class="bill-system-content-main">
      <IsLoading :is-loading="state.isLoading">
        <template #content>
          <!-- 第一层数据 -->
          <div class="flex-box-between-cneter">
            <!-- 年统计图 -->
            <div class="bill-system-year-echart">
              <YearEcharts></YearEcharts>
            </div>

            <!-- 开销的操作 -->
            <div>

            </div>

            <!-- 开销list -->
            <div>

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
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .8);

    // 年度
    .bill-system-year-echart {
      width: 50%;
    }
  }
}
</style>