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
                <router-link :to="{path:'/create', query: {Id: record.recordId}}" >
                    <button>
                        ▼
                    </button>
                </router-link>
                <DeleteButton :targetRecord="record"/>
                <hr>
            </li>
        </ul>
    </v-app>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios';
import DeleteButton from './button/DeleteButton.vue';


const householdAccountBook = reactive({
    recordId : '',
    dating : '',
    amountOfMoney : '',
    categoryId : '',
    remarks : '',
})

const records = ref([]);
const sortFlag = ref(false);

axios.get("http://localhost:8080/records",{
    params:{
        sort: sortFlag.value
    }
})
    .then(response => {
        records.value = response.data
    })


// function sort(){
//     sortFlag.value = !sortFlag.value
//     console.log(sortFlag.value)

//     axios.get("http://localhost:8080/records",{
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


</script>

<style>
#padding{
    padding-top: 180px;
}

</style>