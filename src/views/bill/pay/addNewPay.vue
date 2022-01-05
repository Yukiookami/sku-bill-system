<!--
 * @Author: zxy
 * @Date: 2022-01-02 17:24:25
 * @LastEditTime: 2022-01-05 16:09:12
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
            <span v-if="state.isEdit" @click="dontEdit" class="submit-button margrin-left-nom">キャンセル</span>
          </div>

          <span v-if="!state.isEdit" class="submit-button" @click="newPay(0)">登録</span>
          <span v-else class="submit-button" @click="newPay(1)">編集</span> 
        </div>
      </el-form>
    </div>
    <!-- 登录预算 -->
    <div class="add-new-pay-yosan">
      <dv-decoration-10 style="width:100%;height: 5px"></dv-decoration-10>
      <div class="flex-box-between-cneter yosan-box">
        <el-input-number
          size="small"
          style="width: 30%"
          v-model="state.yosan"
          :controls="false"
        ></el-input-number>
        
        <span @click="yosanAdd" class="submit-button">予算登録</span> 
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import { httpEditBudget } from "../../../request/budget/budget";
import { httpEditPay, httpNewPay } from "../../../request/pay/pay";
import store from "../../../store";
import { checkObjIsEmpty, returnMessage } from "../../../until";
import { getCurrentWeekFirstDay, getCurrentWeekLastDay, getFirstAndLastDayByWeek, getNowDate } from "../../../until/time";

const emit = defineEmits([
  // 获得周数据
  'getWeekData',
  // 更改预算
  'changeYosan'
])

const props = defineProps({
  yosan: Number
})

const state = reactive({
  // 予算
  yosan: 0,
  // 编辑模式
  isEdit: false,
  // 编辑id
  editId: '',
  // 把其他不需要的字段也交上去
  editObj: '',
  // 生成form表单
  formDom: [
    {
      data: "payMoney",
      type: "numberInput",
      title: "金額",
      des: "円",
      placeholder: ''
    },
    {
      data: "payDetail",
      type: "input",
      title: "支出概要"
    },
    {
      data: "payTime",
      type: "date",
      title: "支出時間",
      placeholder: 'pick a day'
    },
    {
      data: "type",
      type: "sel",
      title: "タイプ",
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
  formData.payTime = getNowDate()
}

/**
 * @description: 数据初始化
 * @param {*}
 * @return {*}
 */
const initData = () => {
  state.editId = ''
  state.isEdit = false
  formData.payDetail = ''
  formData.payMoney = 0
  initNowDate()
  formData.type = ''
}

/**
 * @description: 新增开销
 * @param {*} flag 0 新增 1修改
 * @return {*}
 */
const newPay = async (flag) => {
  try {
    if (checkObjIsEmpty(formData)) {
      ElMessage.warning('全部入力してください')
    } else {
      let res = null
      let msg = ''

      if (!flag) {
        res = await httpNewPay({
          payDetail: formData.payDetail,
          payMoney: formData.payMoney,
          payTime: formData.payTime,
          type: formData.type.join('/')
        })

        msg = '支出登録成功しました！'
      } else {
        res = await httpEditPay({
          createTime: state.editObj.createTime,
          id: state.editId,
          payDetail: formData.payDetail,
          payMoney: formData.payMoney,
          payTime: formData.payTime,
          type: formData.type.join('/'),
          updateTime: state.editObj.updateTime,
          userId: state.editObj.userId 
        })

        msg = '編集成功しました！'
      }

      returnMessage(res, msg).success(() => {
        // 获得该日期对应周的第一天和最后一天
        let { startDay, lastDay } = getFirstAndLastDayByWeek(new Date(formData.payTime))

        emit('getWeekData', startDay, lastDay, formData.payTime, true)
        
        initData()
      })
    }
  } catch (err) {
    console.log(err)
  }
}

/**
 * @description: 放弃编辑
 * @param {*}
 * @return {*}
 */
const dontEdit = () => {
  store.commit('setNowEditData', '')
  initData()
}

 /**
  * @description: 登录预算
  * @param {*}
  * @return {*}
  */
const yosanAdd = async () => {
  try {
    if (state.yosan < 0) {
      ElMessage.warning('予算は最低0以上です')
    } else {
      const res = await httpEditBudget(state.yosan)

      returnMessage(res, '予算登録しました').success(() => {
        emit('changeYosan', res.data)
      })
    }
  } catch (err) {

  }
}
 
/**
 * @description: 监听编辑数据
 */
watch(() => store.state.nowEditData, (val) => {
  if (val) {
    state.editObj = val
    let { id } = val
  
    state.isEdit = true
    state.editId = id
  
    for(let i in formData) {
      if (i === 'type') {
        formData[i] = val[i].split('/')
      } else {
        formData[i] = val[i]
      }
    }
  }
})

/**
 * @description: 监听预算修改
 * @param {*}
 * @return {*}
 */
watch(() => props.yosan, val => {
  state.yosan = val
})

initNowDate()
state.yosan = props.yosan
</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
.add-new-pay-main {
  position: relative;
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
    position: absolute;
    bottom: 20px;
    left: 5%;
    width: 90%;
    margin: 10px auto 0;

    .yosan-box {
      width: 100%;
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
