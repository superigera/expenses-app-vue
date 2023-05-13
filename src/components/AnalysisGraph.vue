<template>
    <v-app>
        <p>何年何月の状況</p>
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
axios.get("http://localhost:8080/category")
    .then(response => {

        // slice(3)で先頭の3つ(収入系)を除外
        spendingData.labels = response.data.slice(3)
    })

// 当月の家計簿データを取得
axios.get("http://localhost:8080/current-records")
    .then(response => {
        // slice(0, 3)で先頭の3つ(収入系)を取得
        totalIncome.value = response.data.slice(0, 3).reduce((a, b) => a + b, 0)
        console.log(totalIncome.value)

        // slice(3)で先頭の3つ(収入系)を除外
        spendingData.datasets[0].data = response.data.slice(3)
        totalSpending.value = response.data.slice(3).reduce((a, b) => a + b, 0)
        console.log(totalSpending.value)

        totalRemaining.value = totalIncome.value - totalSpending.value
    })

</script>

<style>
#padding {
    padding-top: 180px;
}

span {
    display: inline-block;
    width: 100px;
    text-align: center;
}
</style>