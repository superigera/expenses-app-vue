<template>
    <v-app>
        <p>最近の記録</p>
        <!-- 横に並べるボタン群 -->
        <button @click="sort">並び替え</button>
        <button>絞り込み</button>

        <ul>
            <li>
                <p>日付</p>
                <p>金額</p>
                <p>カテゴリ</p>
                <p>備考</p>
                <hr>
            </li>
        </ul>
        
        <ul>
            <li v-for="record in records" :key="record.recordId">
                {{ record.dating }}
                {{ record.amountOfMoney }}
                {{ record.categoryName }}
                {{ record.remarks }}
                <router-link :to="{path:'/create', query: {record: 'record'}}" >
                    <button @click="test(record)">
                        ▼
                    </button>
                </router-link>
                <hr>
            </li>
        </ul>
    </v-app>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios';

const householdAccountBook = reactive({
    recordId : '',
    dating : '',
    amountOfMoney : '',
    categoryId : '',
    remarks : '',
})

function test(record){
    console.log(record)
}

const records = ref([]);
const sortFlag = ref(false);

axios.get("http://localhost:8080/record",{
    params:{
        sort: sortFlag.value
    }
})
    .then(response => {
        records.value = response.data
    })

// function edit(){
//     window.open('https://www.sejuku.net/blog/48540',"window_name", "width=300,height=200,scrollbars=yes")
// }

// function sort(){
//     sortFlag.value = !sortFlag.value
//     console.log(sortFlag.value)

//     axios.get("http://localhost:8080/record",{
//         params:{
//             sort: sortFlag.value
//         }
//     })
//     .then(response => {
//         records.value = response.data
//     })
// }

//datingを年月日形式に変更
//→record.datingをsubstring？
//並び替えボタン(ソートは日付？)
//Stringをdate型に変更する　変更してなくてもソートはできている

//絞り込み(カテゴリごと)

//編集ボタンメソッド
//→押下したらpropsでHouseholdAccountBookに遷移して初期値を表示する
//初期値がある場合更新のメソッドボタン、ない場合は記録のメソッドボタン
//propsで画面のフラグを渡して上げれば実現できそう
//ボタン押下後はここに遷移する

</script>

<style>
#padding{
    padding-top: 180px;
}

</style>