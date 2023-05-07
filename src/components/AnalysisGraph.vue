<template>
    <v-app>
        <p>グラフ</p>
        <p>何年何月の状況</p>
        <div>
            <p>支出内訳</p>
            <DoughnutChart :chartData="data" />
        </div>
    </v-app>
</template>

<script setup>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { DoughnutChart } from 'vue-chart-3';
Chart.register(...registerables);

const data = {
    labels: [],
    datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100, 40, 120, 24, 52, 12, 2, 1],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }]
};

// カテゴリの種類を取得
axios.get("http://localhost:8080/category")
    .then(response => {
        data.labels = response.data
        console.log(data.labels)
    })

</script>

<style>
#padding {
    padding-top: 180px;
}
</style>