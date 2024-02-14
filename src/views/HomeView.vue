<template>
  <section>
    <el-skeleton v-if="!loading" :rows="5" animated />
    <Bar 
      v-if="loading"
      :data="{ 
        labels: [...forecast?.map(item => convertDate(item.day))], 
        datasets: [ { data: [...forecast?.map(item => item.avg)] } ]
      }" 
      :options="options" />
    <el-button type="success">Test</el-button>
  </section>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { onMounted, ref } from "vue";
import { statisticStore } from "@/stores/data/statistic";
import { storeToRefs } from "pinia";
import { convertDate } from "@/stores/utils/func";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = statisticStore()
const { forecast, loading } = storeToRefs(store)

const options = ref({
  responsive: true,
})

onMounted(() => {
  if (!forecast.value.length) {
    store.getForct({ route: "feed/tashkent" });
  }
})

</script>

<style lang="">
  
</style>