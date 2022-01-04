<!--
 * @Author: zxy
 * @Date: 2022-01-01 20:04:08
 * @LastEditTime: 2022-01-04 15:02:49
 * @FilePath: /sku-bill-system/src/views/billLogin.vue
-->
<template>
  <div class="bill-system-login-main">
    <div class="bill-system-login-title">
      <dv-decoration-11>
        <span style="color: #7ec699;
  text-shadow: 0 0 1px #7acaec;">
          {{ state.title[state.checkFlag] }}
        </span>
      </dv-decoration-11>
    </div>

    <div class="bill-system-login-bord">
      <div ref="changeBord" class="switch-button user-select-no"> 
        <dv-decoration-9>
          {{ state.title[!state.checkFlag] }}
        </dv-decoration-9>
      </div>

      <dv-border-box-9>
        <div class="login-reg">
          <div class="bill-system-login" :class="{'move-bord': state.checkFlag}">
            <el-form ref="loginFormRef" :model="loginForm">
              <template v-for="item in state.loginFormList" :key="item.data">
                <el-form-item>
                  <el-input v-model="loginForm[item.data]"
                  style="width: 300px;"
                  :show-password="item.pass"
                  :placeholder="item.name"></el-input>
                </el-form-item>
              </template>
            </el-form>

            <div class="login-button text-color-c3">
              <dv-border-box-8>
                <div>
                  ログイン
                </div>
              </dv-border-box-8>
            </div>
          </div>

          <div class="bill-system-register" :class="{'move-bord': state.checkFlag}">
            <el-form ref="loginFormRef" :model="loginForm">
              <template v-for="item in state.regFormList" :key="item.data">
                <el-form-item>
                  <el-input v-model="regFrom[item.data]"
                  style="width: 300px;"
                  :show-password="item.pass"
                  :placeholder="item.name"></el-input>
                </el-form-item>
              </template>
            </el-form>

            <div class="login-button text-color-c3">
              <dv-border-box-8 :reverse="true">
                <div>
                  登録
                </div>
              </dv-border-box-8>
            </div>
          </div>
        </div>
      </dv-border-box-9>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "@vue/reactivity";
import { onBeforeUnmount, onMounted } from "@vue/runtime-core";
import { throttle } from "echarts";

const changeBord = ref(null)

const loginForm = reactive({
  username: '',
  password: ''
})

const regFrom = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const state = reactive({
  title: {
    true: '登録',
    false: 'ログイン'
  },
  checkFlag: false,
  // 登录表单
  loginFormList: [
    {
      name: 'ユーザー名',
      data: 'username',
    },
    {
      name: 'パスワード',
      data: 'password',
      pass: true
    }
  ],
  // 注册表单
  regFormList: [
    {
      name: 'ユーザー名',
      data: 'username'
    },
    {
      name: 'パスワード',
      data: 'password',
      pass: true
    },
    {
      name: '再確認',
      data: 'confirmPassword',
      pass: true
    }
  ]
})

/**
 * @description: 节流
 * @param {*}
 * @return {*}
 */
const throttleFn = throttle(() => {
  state.checkFlag = !state.checkFlag
}, 1000)

onMounted(() => {
  // 绑定节流
  changeBord.value.addEventListener('click', throttleFn)
})

onBeforeUnmount(() => {
  // 销毁事件绑定
  changeBord.value.removeEventListener('click', throttleFn)
})
</script>

<style lang="scss" scoped>
@import '../assets/css/common.scss';
@import '../assets/css/icon/iconfont.css';
.bill-system-login-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, .9);
  background-image: url('../assets/img/back/tifa-final-fantasy-lockhart-v2-3840x2160.png');
  background-size: cover;
  background-position: center;

  &::after {
    content: '';
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, .9);
    z-index: 0;
  }

  .bill-system-login-title {
    height: 60px;
    width: 200px;
    z-index: 1;
    margin: -80px 0 20px 0;
  }
  .bill-system-login-bord {
    position: relative;
    height: 300px;
    width: 600px;
    padding: 10px;
    z-index: 1;

    .switch-button {
      position: absolute;
      height: 100px;
      width: 100px;
      top: 100px;
      right: -120px;
      font-size: 12px;
      color: #7ec699;
      // font-weight: 700;
      text-shadow: 0 0 1px #7acaec;
      cursor: pointer;
    }

    .login-reg {
      overflow: hidden;
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      width: 600px;
      
      .bill-system-login,
      .bill-system-register {
        height: 100%;
        min-width: 600px;
        max-width: 600px;
        transition: all .3s ease-in-out;
        transform: translateX(0);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .login-button {
          cursor: pointer;
          height: 35px;
          width: 120px;

          div {
            height: 100%;
            font-size: 12px;
            color: #7ec699;
            // font-weight: 700;
            text-shadow: 0 0 1px #7acaec;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}

// 移动面板
.move-bord {
  transform: translateX(-600px) !important;
}

:deep(.el-form-item__label) {
  color: $color-c3;
}

:deep(.el-input__inner),
:deep(.el-input__count-inner) {
  border-color: $color-5c;
  background-color: rgba(0, 0, 0, 0.3) !important;
  color: #7ec699;
  // font-weight: 700;
  text-shadow: 0 0 1px #7acaec;
}
</style>