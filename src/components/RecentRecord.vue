<template>
    <v-app style="margin-top: -400px;">
        <v-sheet width="1000px" class="mx-auto my-12 text-center pa-6" rounded="lg">

            <h3>履歴一覧</h3>
            <v-data-table v-model:items-per-page="itemsPerPage" :items="records" :headers="headers" class="elevation-2"
                item-value="name">

            </v-data-table>

        </v-sheet>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRoute } from "vue-router";
import { VDataTable } from 'vuetify/labs/VDataTable'

const BASE_URL = process.env.VUE_APP_API_BASE_URL

const route = useRoute();
const records = ref([]);
const itemsPerPage = ref(5)

const headers = ref([
    { title: '日付', align: 'end', key: 'dating' },
    { title: '金額', align: 'end', key: 'amountOfMoney' },
    { title: 'カテゴリ', align: 'center', key: 'categoryName' },
    { title: '備考', align: 'start', value: 'remarks' },
    { text: '編集', align: 'end', value: 'edit', sortable: false },
    { text: '削除', align: 'end', value: 'delete', sortable: false }
])

//家計簿データ取得
axios.get(BASE_URL + "/records", {
    params: {
        categoryId: route.query.Id || '0',
        startDating: route.query.startDating || '0001-01-01',
        endDating: route.query.endDating || '9999-12-31',
    }
})
    .then(response => {
        records.value = response.data
        console.log(response.data)
    })


</script>

<style></style>