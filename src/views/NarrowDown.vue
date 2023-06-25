<template>
    <v-app>
        <v-sheet width="500" class="ma-auto" rounded="lg">
            <v-form class="pa-6 ma-12">

                <v-select v-model="narrowDown.categoryName" :items="items" label="カテゴリ"></v-select>

                <p>開始日</p>
                <Datepicker style="padding-bottom: 22px;" v-model="narrowDown.startDating" :format="format"
                    model-type="yyyy年MM月dd日" />

                <p>終了日</p>
                <Datepicker style="padding-bottom: 22px;" v-model="narrowDown.endDating" :format="format"
                    model-type="yyyy年MM月dd日" />

                <router-link
                    :to="{ path: '/record', query: { Id: narrowDown.categoryId, startDating: narrowDown.startDating, endDating: narrowDown.endDating } }">
                    <div class="d-flex flex-column">
                        <v-btn rounded="lg" color="indigo-darken-1" size="large" @click="submit">
                            絞り込み
                        </v-btn>
                    </div>
                </router-link>

            </v-form>
        </v-sheet>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const items = ref([]);
const BASE_URL = process.env.VUE_APP_API_BASE_URL

const narrowDown = ref({
    categoryId: '',
    categoryName: '',
    startDating: '',
    endDating: '',
})

// 日付のフォーマット
const format = args => {
    return `${args.getFullYear()}年${("0" + (args.getMonth() + 1)).slice(-2)}月${("0" + (args.getDate())).slice(-2)}日`
}

// カテゴリの種類を取得
axios.get(BASE_URL + "/category")
    .then(response => {
        items.value = response.data
    })


function submit() {
    // デフォルト値の設定
    if (narrowDown.value.categoryId == "") {
        narrowDown.value.categoryId = "0"
    }
    if (narrowDown.value.startDating == "") {
        narrowDown.value.startDating = "0001-01-01"
    }
    if (narrowDown.value.endDating == "") {
        narrowDown.value.endDating = "9999-12-31"
    }

    // プルダウンのindexを取得
    var pullDownIndex = items.value.indexOf(narrowDown.value.categoryName)
    if (pullDownIndex == "-1") {
        // 該当なしの場合全件取得の0を指定
        pullDownIndex = "0"
    } else {
        pullDownIndex = pullDownIndex + 1
    }

    // 形式変換
    narrowDown.value.categoryId = pullDownIndex
    narrowDown.value.startDating = narrowDown.value.startDating.replace(/年|月/g, "-").replace(/日/g, "")
    narrowDown.value.endDating = narrowDown.value.endDating.replace(/年|月/g, "-").replace(/日/g, "")
}
</script>

<style></style>