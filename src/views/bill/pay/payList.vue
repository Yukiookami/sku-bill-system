<!--
 * @Author: zxy
 * @Date: 2022-01-02 18:49:00
 * @LastEditTime: 2022-01-05 16:20:31
 * @FilePath: /sku-bill-system/src/views/bill/pay/payList.vue
-->
<template>
  <div class="pay-list-main">
    <div class="text-color-c3 font-size-12">
      <i class="iconfont icon-vector text-color-5c font-size-16"></i>
      支出リスト（週）
    </div>

    <div class="pay-list-content">
      <div class="pay-list-content-header">
        <PayItem></PayItem>
      </div>

      <template v-for="(item, index) in state.payList" :key="item.payId">
        <PayItem :index="index" :des="item.payDetail" :id="item.id" :editObject="item">
          <template #type>
            <span>
              {{item.type}}
            </span>
          </template>

          <template #time>
            <span>
              {{ item.payTime.slice(0, 10) }} ({{getDateByDayInWeek(item.payTime.slice(0, 10))}})
            </span>
          </template>

          <template #money>
            <span>
              {{item.payMoney}}
            </span>
          </template>

          <template #operate="{ id, editObject }">
            <span class="cursor-pointer" @click="editItem(editObject)">
              編集
            </span>

            <el-popconfirm title="削除してよろしいでしょか?"
            confirmButtonText="削除"
            confirmButtonType="primary"
            cancelButtonText="キャンセル"
            @confirm="delPay(id)">
              <template #reference>
                <span class="cursor-pointer">
                  削除
                </span>
              </template>
            </el-popconfirm>
          </template>
        </PayItem>
      </template>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { httpDelPay } from "../../../request/pay/pay";
import store from "../../../store";
import { returnMessage } from "../../../until";
import { getDateByDayInWeek, getFirstAndLastDayByWeek } from "../../../until/time";
import PayItem from "./payList/payItem.vue";

const emit = defineEmits([
  'getWeekData'
])

const props = defineProps({
  weekDataList: Array,
  nowDate: String
})

const state = reactive({
  payList: []
})

/**
 * @description: 删除开销
 * @param {string} id
 * @return {*}
 */
const delPay = async (id) => {
  try {
    const res = await httpDelPay(id)

    returnMessage(res, '削除しました').success(() => {
      let { startDay, lastDay } = getFirstAndLastDayByWeek(new Date(props.nowDate))

      emit('getWeekData', startDay, lastDay, props.nowDate)
    })
  } catch(err) {
    console.log(err)
  }
}

/**
 * @description: 编辑开销
 * @param {*}
 * @return {*}
 */
const editItem = (obj) => {
  try {
    store.commit('setNowEditData', obj)
  } catch (err) {
    console.log(err)
  }
}

// 监听周数据的变动
watch(() => props.weekDataList, val => {
  state.payList = val
})

state.payList = props.weekDataList
</script>

<style lang="scss">
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

    .pay-list-content-header {
      position: sticky;
      top: 0;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
}

.el-popover {
  border: 1px solid $color-5c !important;
  background-color: rgba(0, 0, 0, 0.9) !important;
  color: #fff !important;
}
</style>