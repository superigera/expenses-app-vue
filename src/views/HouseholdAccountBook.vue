<template>
    <v-app>
        <v-sheet width="500" class="ma-auto" rounded="lg">
            <v-form class="pa-6 ma-12">
                <p>家計簿入力</p>

                <Datepicker style="padding-bottom: 22px;" v-model="householdAccountBook.dating" :format="format"
                    model-type="yyyy年MM月dd日" />

                <v-text-field v-model="householdAccountBook.amountOfMoney" :counter="10" label="金額"></v-text-field>

                <v-select v-model="householdAccountBook.categoryId" :items="items" label="カテゴリ"></v-select>

                <v-text-field v-model="householdAccountBook.remarks" :counter="10" label="備考"></v-text-field>

                <div class="d-flex flex-column">
                    <v-btn rounded="lg" color="indigo-darken-1" size="large" @click="submit">
                        記録
                    </v-btn>
                </div>
            </v-form>
        </v-sheet>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const householdAccountBook = ref({
    dating: '',
    amountOfMoney: '',
    categoryId: '',
    categoryName: '',
    remarks: ''
})

const items = ref([]);

// 日付のフォーマット
const format = args => {
    return `${args.getFullYear()}年${("0" + (args.getMonth() + 1)).slice(-2)}月${("0" + (args.getDate())).slice(-2)}日`
}

// 指定された家計簿を取得
axios.get("http://localhost:8080/record", {
    params: {
        Id: route.query.Id
    }
})
    .then(response => {
        console.log(response.data)
        householdAccountBook.value.dating = response.data.dating.replace('-', '年').replace('-', '月') + '日'
        householdAccountBook.value.amountOfMoney = response.data.amountOfMoney
        householdAccountBook.value.categoryId = response.data.categoryName
        householdAccountBook.value.remarks = response.data.remarks
    })

// カテゴリの種類を取得
axios.get("http://localhost:8080/category")
    .then(response => {
        items.value = response.data
    })

// 記録ボタン押下
function submit() {
    //プルダウンのindexを取得
    const pullDownIndex = items.value.indexOf(householdAccountBook.value.categoryId)

    //日付置換
    const dateReplacement = householdAccountBook.value.dating.replace(/年|月/g, '-').replace('日', '')

    axios.post("http://localhost:8080/record", {
        "dating": dateReplacement,
        "amountOfMoney": householdAccountBook.value.amountOfMoney,
        "categoryId": pullDownIndex,
        "remarks": householdAccountBook.value.remarks,
    }
        , { headers: { "Content-Type": "application/json" } }
    )
        .then(
            //最近の記録画面へ遷移
            router.push('/record'))
}
</script>

<style></style>