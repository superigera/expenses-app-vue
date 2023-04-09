<template>
    <v-app>
        <p>グラフ</p>
        <p>何年何月の状況</p>
        <div>
            <PieChart :chartData="data"/>
        </div>
    </v-app>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios';
import { Chart, DoughnutController, ArcElement, Tooltip ,PieChart} from 'chart.js';
Chart.register(DoughnutController, ArcElement, Tooltip,Chart,PieChart);

// const data = {
//     labels: ['January', 'February', 'March'],
//     datasets: [{ data: [40, 20, 12] }]
// }

const data = {
    labels: [
    'Red',
    'Blue',
    'Yellow'
    ],
    datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
    }]
};

const options = {
    responsive: true
}


const householdAccountBook = reactive({
    recordId : '',
    dating : '',
    amountOfMoney : '',
    categoryId : '',
    remarks : '',
})

// function test(record){
//     console.log(record)
// }

// const records = ref([]);
// const sortFlag = ref(false);

// axios.get("http://localhost:8080/records",{
//     params:{
//         sort: sortFlag.value
//     }
// })
//     .then(response => {
//         records.value = response.data
//     })

</script>

<style>
#padding{
    padding-top: 180px;
}

</style>