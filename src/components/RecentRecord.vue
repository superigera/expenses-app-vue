<template>
    <v-app style="margin-top: -400px;">
        <v-sheet width="1000px" class="mx-auto my-12 text-center pa-6" rounded="lg">
            <!-- <v-data-table :headers="headers" :items="test">
                <template #actions="{ id }">
                    <v-btn icon @click="deleteTest(id)">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </template>
            </v-data-table> -->
            <h3>履歴一覧</h3>

            <div style="display: flex; margin-top: 10px;">
                <v-btn @click="sort" rounded="lg" color="indigo-darken-1" size="large">
                    並び替え
                </v-btn>
                <NarrowDownButton size="large" style="margin-left: 10px; width: 30px;" />
            </div>

            <v-table>
                <thead>
                    <tr>
                        <th>日付</th>
                        <th>金額</th>
                        <th>カテゴリ</th>
                        <th>備考</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="record in records" :key="record.recordId">
                        <td>{{ record.dating }}</td>
                        <td>{{ record.amountOfMoney }}</td>
                        <td>{{ record.categoryName }}</td>
                        <td>{{ record.remarks }}</td>
                        <td>
                            <router-link :to="{ path: '/create', query: { Id: record.recordId } }">
                                <button>
                                    ▼
                                </button>
                            </router-link>
                        </td>
                        <td>
                            <DeleteButton :targetRecord="record" />
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-sheet>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import DeleteButton from './button/DeleteButton.vue';
import NarrowDownButton from './button/NarrowDownButton.vue';
import { useRoute } from "vue-router";
import { VDataTable } from 'vuetify/labs/VDataTable'

const BASE_URL = process.env.VUE_APP_API_BASE_URL



const headers = [
    { title: '日付', align: 'end', key: 'dating' },
    { title: '金額', align: 'end', key: 'amountOfMoney' },
    { title: 'カテゴリ', align: 'end', key: 'categoryName' },
    { title: '備考', align: 'end', value: 'remarks' },
    { text: '編集', value: 'edit', sortable: false },
    { text: '削除', value: 'delete', sortable: false }
]

const test = ref({
    dating: '',
    amountOfMoney: '',
    categoryName: '',
    remarks: '',
});

// function deleteTest(item) {
//     console.log(item)
// }

const route = useRoute();

const records = ref([]);
const sortFlag = ref(false);

function getAxios() {
    axios.get(BASE_URL + "/records", {
        params: {
            categoryId: route.query.Id || '0',
            startDating: route.query.startDating || '0001-01-01',
            endDating: route.query.endDating || '9999-12-31',
            sort: sortFlag.value
        }
    })

        .then(response => {
            records.value = response.data
            test.value = response.data
            console.log(test.value)
        })
}
getAxios()

function sort() {
    sortFlag.value = !sortFlag.value
    getAxios()
}
</script>

<style>
#padding {
    padding-top: 180px;
}
</style>