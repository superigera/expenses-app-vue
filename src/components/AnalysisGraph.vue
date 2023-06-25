<template>
    <v-app>
        <v-sheet width="1000px" class="mx-auto my-12 text-center pa-6" rounded="lg">
            <h3>{{ year }}年{{ month }}月の状況</h3>
            <div>
                <span>予算</span>
                <span></span>
                <span>支出</span>
                <span></span>
                <span>残り</span>
            </div>
            <div>
                <span>{{ totalIncome }}</span>
                <span>-</span>
                <span>{{ totalSpending }}</span>
                <span>=</span>
                <span>{{ totalRemaining }}</span>
            </div>
            <div style="display: inline-block; width: 50%;">
                <p>支出内訳</p>
                <DoughnutChart :chartData="spendingData" />
            </div>
        </v-sheet>
    </v-app>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { DoughnutChart } from 'vue-chart-3';
Chart.register(...registerables);

const totalSpending = ref(0);
const totalIncome = ref(0);
const totalRemaining = ref(0);
const year = ref();
const month = ref();
const BASE_URL = process.env.VUE_APP_API_BASE_URL

//年月を取得
const today = new Date()
year.value = today.getFullYear()
month.value = today.getMonth() + 1

const spendingData = reactive({
    labels: [],
    datasets: [{
        label: '支出',
        data: [],
        backgroundColor: [
            'rgb(255, 128, 191)',
            'rgb(102, 204, 255)',
            'rgb(255, 255, 102)',
            'rgb(178, 255, 102)',
            'rgb(169, 169, 169)',
            'rgb(153, 102, 204)',
            'rgb(211, 211, 211)'
        ],
        hoverOffset: 4
    }]
});

// カテゴリの種類を取得
axios.get(BASE_URL + "/category")
    .then(response => {

        // slice(3)で先頭の3つ(収入系)を除外
        spendingData.labels = response.data.slice(3)
    })

// 当月の家計簿データを取得
axios.get(BASE_URL + "/current-records")
    .then(response => {
        // slice(0, 3)で先頭の3つ(収入系)を取得
        totalIncome.value = response.data.slice(0, 3).reduce((a, b) => a + b, 0)

        // slice(3)で先頭の3つ(収入系)を除外
        spendingData.datasets[0].data = response.data.slice(3)
        totalSpending.value = response.data.slice(3).reduce((a, b) => a + b, 0)

        // 残りを計算
        totalRemaining.value = totalIncome.value - totalSpending.value

    })

</script>

<style>
span {
    display: inline-block;
    width: 100px;
    text-align: center;
}
</style>