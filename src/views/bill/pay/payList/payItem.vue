<!--
 * @Author: zxy
 * @Date: 2022-01-02 18:56:45
 * @LastEditTime: 2022-01-04 22:24:00
 * @FilePath: /sku-bill-system/src/views/bill/pay/payList/payItem.vue
-->
<template>
  <div>
    <div
      class="flex-box-between-cneter text-color-c3 font-size-12 pay-list-item-box"
      :class="{ 'change-color': index % 2 }"
    >
      <div class="type-box">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="des"
          placement="top"
        >
          <slot name="type">
            <span> タイプ </span>
          </slot>
        </el-tooltip>
      </div>

      <div class="time-box">
        <slot name="time">
          <span> 時間 </span>
        </slot>
      </div>

      <div class="money-box">
        <slot name="money">
          <span> 金額 </span>
        </slot>
      </div>

      <div class="operate-box">
        <slot name="operate" :id="id" :editObject="editObject">
          <span> 操作 </span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const porps = defineProps({
  des: String,
  index: {
    type: Number,
    default: 0,
  },
  // 用于删除
  id: String,
  // 用于编辑
  editObject: Object
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/common.scss";

.pay-list-item-box {
  padding: 13px 15px;
  background-color: rgb(15, 19, 37);

  div {
    display: flex;
    justify-content: flex-start;
  }

  .type-box {
    width: 120px;
    cursor: pointer;
  }

  .time-box {
    width: 80px;
  }

  .money-box {
    width: 50px;
  }

  .operate-box {
    justify-content: space-between;
    width: 60px;
  }
}

.change-color {
  background-color: rgb(23, 28, 51);
}
</style>
