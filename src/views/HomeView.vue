<template>
  <section style="width: 800px;" >
    <el-skeleton v-if="loading" :rows="5" animated />
    <div v-else>
      <Line 
        v-for="fr in forecast" :key="fr"
        :data="{ 
          labels: [ ...fr?.data?.map(item => convertDate(item.day)) ], 
          datasets: [ { 
            label: fr.name,
            backgroundColor: '#f87979',
            data: [ ...fr?.data?.map(item => item.avg) ] 
          } ],
        }"
        :options="options"
      />
      <el-button @click="handleSearch" type="success">Test</el-button>
    </div>
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

const { loading, stations, forecast } = storeToRefs(store)

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = ref({
  responsive: true,
})

// let search = ref("");

const handleSearch = async (val) => {
  if (!val) return
  // store.getStation({route: "search", keyword: val.trim()});
  console.log(stations);
};

onMounted(() => {
  if (!stations?.value.length) {
    store.getStation({ route: "search", keyword: "Tashkent" });
  }
  console.log(forecast);
})

</script>

<style lang="">
  
</style>