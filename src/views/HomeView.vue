<template>
    <el-skeleton v-if="loading" :rows="5" animated />
  <section v-else style="width: 800px;" v-for="fr in forecast" :key="fr">
    4545
    <Line 
      v-if="!loading"
      :data="{ 
        labels: [...forecast?.data.map(item => convertDate(item.day))], 
        datasets: [ { 
          label: forecast.name,
          backgroundColor: '#f87979',
          data: [...forecast?.data.map(item => item.avg)] 
        } ],
      }" 
      :options="options" />
    <el-button type="success">Test</el-button>
  </section>
</template>

<script setup>
import { Line } from "vue-chartjs";

import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { convertDate } from "@/stores/utils/func";
import { placeStore } from "@/stores/data/place";
const store = placeStore()

const { loading, stations, forecast } = storeToRefs(placeStore)

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = ref({
  responsive: true,
})

// let search = ref("");

// const handleSearch = async (val) => {
//   if (!val) return
//   store.getStation({route: "search", keyword: val.trim()});
// };

onMounted(() => {
  if (!stations?.value.length) {
    store.getStation({route: "search", keyword: "Tashkent"});
  }
  console.log(forecast);
})

</script>

<style lang="">
  
</style>