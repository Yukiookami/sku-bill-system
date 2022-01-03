<!--
 * @Author: zxy
 * @Date: 2022-01-02 18:49:00
 * @LastEditTime: 2022-01-02 19:36:31
 * @FilePath: /sku-bill-system/src/views/bill/pay/payList.vue
-->
<template>
  <div class="pay-list-main">
    <div class="text-color-c3 font-size-12">
      <i class="iconfont icon-vector text-color-5c font-size-16"></i>
      リスト
    </div>

    <div class="pay-list-content">
      <PayItem></PayItem>

      <template v-for="(item, index) in state.payList" :key="item.payId">
        <PayItem :index="index" :des="item.payDetail">
          <template #type>
            <span>
              {{item.type}} / {{item.childType}}
            </span>
          </template>

          <template #time>
            <span>
              {{ item.payTime }}
            </span>
          </template>

          <template #money>
            <span>
              {{item.payMoney}}
            </span>
          </template>

          <template #operate>
            <span class="cursor-pointer">
              編集
            </span>

            <span class="cursor-pointer">
              削除
            </span>
          </template>
        </PayItem>
      </template>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import PayItem from "./payList/payItem.vue";

const state = reactive({
  payList: [
    {
      payId: "1",
      payMoney: 5000,
      payDetail: '吃饭',
      payTime: "2022-01-01",
      childType: "食料",
      type: '生活費'
    },
    {
      payId: "2",
      payMoney: 5000,
      payDetail: '吃饭',
      payTime: "2022-01-01",
      childType: "食料",
      type: '生活費'
    },
    {
      payId: "3",
      payMoney: 5000,
      payDetail: '吃饭',
      payTime: "2022-01-01",
      childType: "食料",
      type: '生活費'
    },
    {
      payId: "4",
      payMoney: 5000,
      payDetail: '吃饭',
      payTime: "2022-01-01",
      childType: "食料",
      type: '生活費'
    },
  ]
})
</script>

<style lang="scss" scoped>
@import '../../../assets/css/common.scss';
@import '../../../assets/css/icon/iconfont.css';

.pay-list-main {
  width: calc(100% - 30px);
  height: calc(100% - 35px);
  padding: 20px 15px 10px 15px;

  .pay-list-content {
    overflow: scroll;
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 35px);
  }

  ::-webkit-scrollbar {
    display: none;
  }
}
</style>