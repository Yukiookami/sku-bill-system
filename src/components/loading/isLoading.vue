<!--
 * @Author: zxy
 * @Date: 2022-01-01 21:14:25
 * @LastEditTime: 2022-01-01 21:15:41
 * @FilePath: /sku-bill-system/src/components/loading/isLoading.vue
-->
<template>
  <dv-loading v-if="isLoading">
    <div class="margin-top-mini text-color-w">
      Loading...
    </div> 
  </dv-loading>

  <template v-else>
    <slot name="content"></slot>
  </template>
</template>

<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';
</style>