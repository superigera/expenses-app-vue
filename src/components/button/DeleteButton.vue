<template>
        <v-btn rounded="lg" color="indigo-darken-1" size="x-large" @click="deleteItem">
            削除
        </v-btn>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue'

const item = defineProps(["targetRecord"]);
const emit = defineEmits(["delete"])
const sortFlag = ref(false);

//削除後の表示を考える

function deleteItem(){
    if(confirm(`本当にこの記録を削除しますか？\r\n日付：${item.targetRecord.dating}\r\n金額：${item.targetRecord.amountOfMoney}\r\nカテゴリ：${item.targetRecord.categoryName}\r\n備考：${item.targetRecord.remarks}`)){
        axios.post("http://localhost:8080/deleteRecord",{
            "recordId" : item.targetRecord.recordId
        }  
        ,{ headers: { "Content-Type": "application/json"} }
        )
}
}
</script>   

<style scoped>
/* a {
text-decoration: none;
} */
</style>    
