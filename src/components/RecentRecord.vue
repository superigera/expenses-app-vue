<template>
    <v-app>
        <HeaderMenu />
        <p>最近の記録</p>
        <!-- <v-sheet width="200" class="mx-auto">
            <v-form ref="form" id="padding">
            <v-text-field
                v-model="householdAccountBook.date"
                :counter="10"
                label="日付"
            ><v-date-picker v-model="householdAccountBook.date" /></v-text-field>

            <v-text-field
                v-model="householdAccountBook.amountOfMoney"
                :counter="10"
                label="金額"
            ></v-text-field>

            <v-select
                v-model="householdAccountBook.category"
                :items="[]"
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
        </v-sheet> -->
    </v-app>
</template>

<script setup>
import HeaderMenu from '@/components/HeaderMenu.vue'
import { reactive, ref } from 'vue'
import axios from 'axios';

const householdAccountBook = reactive({
    date : '',
    amountOfMoney : '',
    category : '',
    remarks : '',
})

const items = ref([]);


axios.get("http://localhost:8080/record")
    .then(response => {
        items.value = response.data
        // console.log(items.value)
    })


//DBにレコードの用意
//収入はカテゴリーに含める
//

//編集OKの処理にする
// function submit(){
//     axios.post("http://localhost:8080/record",{
//         "date" : householdAccountBook.date,
//         "amountOfMoney" : householdAccountBook.amountOfMoney,
//         "category" : householdAccountBook.category,
//         "remarks": householdAccountBook.remarks,
//     }
//     ,{ headers: { "Content-Type": "application/json"} }
//     )
//     .then(console.log(householdAccountBook))

// }
</script>

<style>
#padding{
    padding-top: 180px;
}

</style>