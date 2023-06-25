<template>
    <v-app>
        <v-sheet width="500" class="ma-auto" rounded="lg">
            <v-form class="pa-6 ma-12" @submit.prevent="householdAccountBookSubmit">
                <p>家計簿入力</p>

                <Datepicker style="padding-bottom: 22px;" v-model="householdAccountBook.dating" :format="format"
                    model-type="yyyy年MM月dd日" :rules="requiredRules" />

                <v-text-field v-model="householdAccountBook.amountOfMoney" label="金額" :rules="numberRules"></v-text-field>

                <v-select v-model="householdAccountBook.categoryId" :items="items" label="カテゴリ"
                    :rules="requiredRules"></v-select>

                <v-text-field v-model="householdAccountBook.remarks" label="備考"></v-text-field>

                <div class="d-flex flex-column">
                    <v-btn type="submit" rounded="lg" color="indigo-darken-1" size="large">
                        記録
                    </v-btn>
                    <v-btn @click="back" class="mt-6" rounded="lg" color="indigo-darken-1" size="large">
                        戻る
                    </v-btn>
                </div>
            </v-form>
        </v-sheet>
    </v-app>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const BASE_URL = process.env.VUE_APP_API_BASE_URL

const householdAccountBook = reactive({
    dating: '',
    amountOfMoney: '',
    categoryId: '',
    categoryName: '',
    remarks: ''
})

const requiredRules = [
    value => !!value || '必須項目です.'
]

const numberRules = [
    value => !!value || '必須項目です.',
    value => !isNaN(value) || '数字を入力してください.'
]

const items = ref([]);

function back() {
    router.push('/record')
}

// 日付のフォーマット
const format = args => {
    return `${args.getFullYear()}年${("0" + (args.getMonth() + 1)).slice(-2)}月${("0" + (args.getDate())).slice(-2)}日`
}

// 指定された家計簿を取得
if (route.query.Id != null) {
    axios.get(BASE_URL + "/record", {
        params: {
            Id: route.query.Id
        }
    })
        .then(response => {
            householdAccountBook.dating = response.data.dating.replace('-', '年').replace('-', '月') + '日'
            householdAccountBook.amountOfMoney = response.data.amountOfMoney
            householdAccountBook.categoryId = response.data.categoryName
            householdAccountBook.remarks = response.data.remarks
        })
}

//編集以外で家計簿を入力する場合、日付を今日とする
if (route.query.Id == null) {
    const today = new Date()
    householdAccountBook.dating = format(today)
}

//プルダウンに表示するカテゴリを取得
axios.get(BASE_URL + "/category")
    .then(response => {
        items.value = response.data
    })

// 記録ボタン押下
function householdAccountBookSubmit() {
    //formのバリデーションチェック
    if (householdAccountBook.dating == '' || householdAccountBook.amountOfMoney == '' || householdAccountBook.categoryId == '') {
        alert("必須項目を入力してください。")
        return
    }

    //プルダウンのindexを取得
    const pullDownIndex = items.value.indexOf(householdAccountBook.categoryId)

    //日付置換
    const dateReplacement = householdAccountBook.dating.replace(/年|月/g, '-').replace('日', '')

    axios.post(BASE_URL + "/record", {
        "dating": dateReplacement,
        "amountOfMoney": householdAccountBook.amountOfMoney,
        "categoryId": pullDownIndex,
        "remarks": householdAccountBook.remarks,
    }
        , { headers: { "Content-Type": "application/json" } }
    )
        .then(
            //最近の記録画面へ遷移
            router.push('/record'))
}
</script>

<style>
/* カテゴリ左寄せ用 */
.v-select__selection-text {
    text-align: left;
}
</style>