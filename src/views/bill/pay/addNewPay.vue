<!--
 * @Author: zxy
 * @Date: 2022-01-02 17:24:25
 * @LastEditTime: 2022-01-03 14:15:38
 * @FilePath: /sku-bill-system/src/views/bill/pay/addNewPay.vue
-->
<template>
  <!-- 增加新的开销，于登录预算 -->
  <div class="add-new-pay-main">
    <!-- 新的开销 -->
    <div>
      <dv-decoration-7 class="margrin-bottom-nom">
        <div class="text-color-c3 margrin-side-big">
          <span v-if="!state.isEdit">登録</span>
          <span v-else>編集</span>
        </div>
      </dv-decoration-7>

      <el-form ref="formRef" :model="formData" :label-width="80">
        <template v-for="item in state.formDom" :key="item.data">
          <el-form-item :label="item.title" class="text-color-c3">
            <el-input
              size="small"
              maxlength="20"
              show-word-limit
              style="width: 90%"
              v-if="item.type === 'input'"
              v-model="formData[item.data]"
              :placeholder="item.placeholder"
            ></el-input>

            <el-input-number
              v-else-if="item.type === 'numberInput'"
              v-model="formData[item.data]"
              size="small"
              :placeholder="item.placeholder"
              :controls="false"
            />

            <el-date-picker
              v-else-if="item.type === 'date'"
              :default-value="new Date()"
              style="width: 90%"
              value-format="YYYY-MM-DD"
              size="small"
              @change="chooseDay"
              v-model="formData[item.data]"
              type="date"
              :placeholder="item.placeholder"
            ></el-date-picker>

            <el-cascader
              v-else-if="item.type === 'sel'"
              style="width: 90%"
              v-model="formData[item.data]"
              :options="item.options"
              :props="item.props"
              size="small"
              :placeholder="item.placeholder"
              @change="handleChange"
            ></el-cascader>

            <span v-if="item.des" class="margrin-left-nom">{{ item.des }}</span>
          </el-form-item>
        </template>

        <div class="text-color-c3 flex-box-between-cneter" style="width: 91%">
          <div>
            <span v-if="state.isEdit" class="submit-button margrin-left-nom">キャンセル</span>
          </div>

          <span v-if="!state.isEdit" class="submit-button">登録</span>
          <span v-else class="submit-button">編集</span> 
        </div>
      </el-form>
    </div>
    <!-- 登录预算 -->
    <div class="add-new-pay-yosan">
      <dv-decoration-4 :reverse="true" style="width:95%;"></dv-decoration-4>
      <div class="flex-box-between-cneter yosan-box">
        <el-input-number
          size="small"
          style="width: 30%"
          v-model="state.yosan"
          :controls="false"
        ></el-input-number>
        
        <span class="submit-button">予算登録</span> 
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const state = reactive({
  // 予算
  yosan: 100000,
  // 编辑模式
  isEdit: false,
  // 生成form表单
  formDom: [
    {
      data: "payMoney",
      type: "numberInput",
      title: "金額",
      des: "円",
      placeholder: '金額を入力してください'
    },
    {
      data: "payDetail",
      type: "input",
      title: "支出描述"
    },
    {
      data: "payTime",
      type: "date",
      title: "消费时间",
      placeholder: 'pick a day'
    },
    {
      data: "type",
      type: "sel",
      title: "消费类型",
      placeholder: 'select type',
      options: [
        {
          value: "生活費",
          label: "生活費",
          children: [
            {
              value: "電気ガス代",
              label: "電気ガス代",
            },
            {
              value: "水道代",
              label: "水道代",
            },
            {
              value: "食料",
              label: "食料",
            },
            {
              value: "交通料",
              label: "交通料",
            },
            {
              value: "その他",
              label: "その他",
            },
          ],
        },
        {
          value: "買い物",
          label: "買い物",
          children: [
            {
              value: "コンビニ・スーパー",
              label: "コンビニ・スーパー",
            },
            {
              value: "服",
              label: "服",
            },
            {
              value: "生活用品",
              label: "生活用品",
            },
            {
              value: "電子機器",
              label: "電子機器",
            },
            {
              value: "その他",
              label: "その他",
            },
          ],
        },
        {
          value: "ゲーム",
          label: "ゲーム",
          children: [
            {
              value: "テレビゲーム",
              label: "テレビゲーム"
            },
            {
              value: 'PC',
              label: 'PC'
            },
            {
              value: '課金',
              label: '課金'
            },
            {
              value: 'その他',
              label: 'その他'
            }
          ]
        },
        {
          value: 'その他',
          label: 'その他'
        }
      ],
      props: {expandTrigger: 'hover'},
    },
  ],
});

const formData = reactive({
  payMoney: 0,
  payDetail: "",
  payTime: "",
  type: "",
});

/**
 * @description: 选择时间
 * @param {*}
 * @return {*}
 */
const chooseDay = (e) => {
  console.log(e);
};

/**
 * @description: 选择类型
 * @param {*}
 * @return {*}
 */
const handleChange = (e) => {
  console.log(e);
};

/**
 * @description: 设置当前年月日
 * @param {*}
 * @return {*}
 */
const initNowDate = () => {
  const date = new Date()
  let month = (date.getMonth() + 1).toString()
  let day = date.getDate().toString()

  if (month.length !== 2) {
    month = 0 + month
  }

  if (day.length !== 2) {
    day = 0 + day
  }

  formData.payTime = `${date.getFullYear()}-${month}-${day}`
}


initNowDate()
</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
.add-new-pay-main {
  width: calc(100% - 20px);
  height: calc(100% - 30px);
  padding: 20px 10px 10px 10px;

  .submit-button {
    display: block;
    padding: 5px 15px;
    border: 1px solid $color-5c;
    border-radius: 5px;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.3) !important;
    color: $color-c3;
    cursor: pointer;
  }

  .add-new-pay-yosan {
    width: 90%;
    margin: 10px auto 0;

    .yosan-box {
      width: 96%;
      padding-top: 20px;
    }
  }
}

:deep(.el-form-item__label) {
  color: $color-c3;
}

:deep(.el-input__inner),
:deep(.el-input__count-inner) {
  border-color: $color-5c;
  background-color: rgba(0, 0, 0, 0.3) !important;
  color: $color-c3;
}

:deep(.el-scrollbar__view) {
  background-color: rgba(0, 0, 0, 0.3) !important;
  color: $color-c3;
}
</style>
