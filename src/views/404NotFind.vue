<!--
 * @Author: zxy
 * @Date: 2022-01-01 20:10:36
 * @LastEditTime: 2022-01-01 20:11:48
 * @FilePath: /sku-bill-system/src/views/404NotFind.vue
-->
<template>
  <div class="blog-404-sec">
    <img src="../assets/img/statusImg/404-title.png">
    <img src="../assets/img/statusImg/404-line.png" alt="">
    <img src="../assets/img/statusImg/404-manga/man-1.png" alt="">
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  setup () {
    const state = reactive({
      count: 0,
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-404-sec {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 980px;
  margin: 80px auto 30px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .2);
}
</style>