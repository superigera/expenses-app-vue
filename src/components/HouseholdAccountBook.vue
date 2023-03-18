<template>
    <v-app>
        <HeaderMenu />
        <v-sheet width="200" class="mx-auto">
            <v-form ref="form" id="padding">
            <p>家計簿入力</p>

            <Datepicker  style="padding-bottom: 22px;" v-model="householdAccountBook.dating" :format="format" model-type="yyyy年MM月dd日"/>

            <v-text-field
                v-model="householdAccountBook.amountOfMoney"
                :counter="10"
                label="金額"
            ></v-text-field>

            <v-select
                v-model="householdAccountBook.category"
                :items="items"
                label="カテゴリ"
            ></v-select>

            <v-text-field
                v-model="householdAccountBook.remarks"
                :counter="10"
                label="備考"
            ></v-text-field>

            <div class="d-flex flex-column">
                <v-btn
                rounded="lg"
                color="indigo-darken-1"
                size="large"
                @click="submit"
                >
                記録
                </v-btn>
            </div>
            </v-form>
        </v-sheet>
    </v-app>
</template>

<script setup>
import HeaderMenu from '@/components/HeaderMenu.vue'
import { reactive, ref } from 'vue'
import axios from 'axios';
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const householdAccountBook = reactive({
    dating : '',
    amountOfMoney : '',
    category : '',
    remarks : '',
})

const items = ref([]);

// 日付のフォーマット
const format = args => {
    return `${args.getFullYear()}年${("0" + (args.getMonth() + 1)).slice(-2)}月${("0" + (args.getDate() + 1)).slice(-2)}日`
}


// カテゴリの種類を取得
axios.get("http://localhost:8080/category")
    .then(response => {
        items.value = response.data
    })

// 記録ボタン押下
function submit(){
    //プルダウンのindexを取得
    const pullDownIndex = items.value.indexOf(householdAccountBook.category)

    //日付置換
    const dateReplacement = householdAccountBook.dating.replace(/年|月/g, '-').replace('日', '')

    axios.post("http://localhost:8080/record",{
        "dating" : dateReplacement,
        "amountOfMoney" : householdAccountBook.amountOfMoney,
        "categoryId" : pullDownIndex,
        "remarks": householdAccountBook.remarks,
    }
    ,{ headers: { "Content-Type": "application/json"} }
    )   
}
</script>

<style>
#padding{
    padding-top: 180px;
}

</style>