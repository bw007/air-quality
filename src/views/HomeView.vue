<template>
  <section>
    <Bar :data="data" :options="options" />
  </section>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { onMounted, ref } from "vue";
import { statisticStore } from "@/stores/data/statistic";
import { storeToRefs } from "pinia";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = statisticStore()
const { forecast } = storeToRefs(store)

const data = ref({
  labels: [ '...forecast.value.pm25' ],
  datasets: [ { data: [forecast.value.pm25?.min] } ]
})

const options = ref({
  responsive: true,
})

console.log(forecast.value.pm25);
console.log();

onMounted(() => {
  store.getForct({ route: "feed/tashkent" });
})

</script>

<style lang="">
  
</style>