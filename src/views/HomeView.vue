<template>
  <section style="height: 100vh;">
    <h1 style="margin-bottom: 20px">{{ $route.meta.text }}</h1>
    <el-text>Stansiyani qidirish</el-text>
    <el-input
      v-model="search"
      @change="handleSearch(search)"
      clearable
      placeholder="Misol: Jakarta"
      style="margin: 5px 0;"
    />
    <p v-show="!loading" style="margin-top: 12px;">Natijalar: {{ stations_count }}</p>
    <el-skeleton v-if="loading" :rows="5" style="margin-top: 20px;" animated />
    <div v-else style="display: flex; flex-wrap: wrap; width: 100%;">
      <div v-for="fr in forecast" :key="fr" style="width: 620px; margin-top: 15px;">
        <Line
          :data="{ 
            labels: [ ...fr.forecast.daily.pm25.map(item => convertDate(item.day)) ], 
            datasets: [ { 
              label: fr.name,
              backgroundColor: '#67C23A',
              data: [ ...fr.forecast.daily.pm25.map(item => item.avg) ] 
            } ],
          }"
          :options="options"
        />
      </div>
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

const { loading, stations, forecast, stations_count } = storeToRefs(store)

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = ref({
  responsive: true,
})

let search = ref("");

const handleSearch = async (val) => {
  if (!val) return
  store.getStation({route: "search", keyword: val.trim()});
};

onMounted(() => {
  if (!stations?.value.length) {
    store.getStation({ route: "search", keyword: "Tashkent" });
  }
})

</script>