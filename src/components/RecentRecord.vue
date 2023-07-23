<template>
    <v-app style="margin-top: -400px;">
        <v-sheet width="1000px" class="mx-auto my-12 text-center pa-6" rounded="lg">

            <h3>履歴一覧</h3>
            <v-data-table v-model:items-per-page="itemsPerPage" :items="records" :headers="headers" class="elevation-2"
                item-value="name" items-per-page-text="ページ">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon size="small" class="me-2" @click="editItem(item.raw)">
                        mdi-pencil
                    </v-icon>
                    <v-icon size="small" @click="deleteItem(item.raw)">
                        mdi-delete
                    </v-icon>
                </template>

                <!-- 削除ダイアログ -->
                <template v-slot:top>
                    <v-dialog v-model="dialogDelete" :deleteItemId="deleteItemId" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">本当に削除しますか？</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">キャンセル</v-btn>
                                <v-btn color="blue-darken-1" variant="text"
                                    @click="deleteItemConfirm(deleteItemId)">削除</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </template>
            </v-data-table>
        </v-sheet>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRoute } from "vue-router";
import { VDataTable } from 'vuetify/labs/VDataTable'
import router from '@/router'

const BASE_URL = process.env.VUE_APP_API_BASE_URL

const route = useRoute();
const records = ref([]);
const itemsPerPage = ref(5)
const dialogDelete = ref(false)
const deleteItemId = ref(0)

const headers = ref([
    { title: '日付', align: 'end', key: 'dating' },
    { title: '金額', align: 'end', key: 'amountOfMoney' },
    { title: 'カテゴリ', align: 'center', key: 'categoryName' },
    { title: '備考', align: 'start', value: 'remarks' },
    { title: '', key: 'actions', sortable: false }
])

//家計簿ページへ遷移
function editItem(item) {
    router.push({ path: '/create', query: { Id: item.recordId } })
}

//削除ダイアログ表示
function deleteItem(item) {
    deleteItemId.value = item.recordId
    dialogDelete.value = true
}

//削除承認
function deleteItemConfirm(deleteItemId) {

    //ID受けっとってaxiosで削除
    axios.post(BASE_URL + "/deleteRecord", {
        "recordId": deleteItemId
    }
        , { headers: { "Content-Type": "application/json" } }
    )

    //削除ダイアログを閉じて、家計簿データを再取得
    getRecords();
    closeDelete()
}

//削除ダイアログを閉じる
function closeDelete() {
    dialogDelete.value = false
}

//家計簿データ取得
function getRecords() {
    axios.get(BASE_URL + "/records", {
        params: {
            categoryId: route.query.Id || '0',
            startDating: route.query.startDating || '0001-01-01',
            endDating: route.query.endDating || '9999-12-31',
        }
    })
        .then(response => {
            records.value = response.data
        })
}

getRecords();
</script>

<style></style>