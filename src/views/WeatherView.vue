<template>
  <section>
    <h1 style="margin-bottom: 15px">Manzilni qidirish</h1>
    <el-input
      v-model="search"
      @change="handleSearch(search)"
      clearable
      placeholder="Misol: Jakarta"
      style="margin-bottom: 20px;"
    />
    
    <el-skeleton animated>
      <template #template>
        <el-skeleton-item variant="circle" style="width: 70px; height: 70px;" />
        <div style="padding: 5px; width: 300px;">
          <el-skeleton-item variant="h1" style="width: 200px" />
          <div style="margin-top: 10px;">
            <el-skeleton-item variant="text"  />
            <el-skeleton-item variant="text" />
          </div>
        </div>
      </template>
    </el-skeleton>


  </section>
</template>

<script setup>


import { weatherStore } from "@/stores/data/weather";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
// import { convertDate } from "@/stores/utils/func";
import { placeStore } from "@/stores/data/place";


const place = placeStore()
const store = weatherStore()

const { loading, stations } = storeToRefs(place)
const { city } = storeToRefs(store);

let search = ref("");

const handleSearch = async (val) => {
  if (!val) return
  store.getWeather({ route: "search", keyword: val.trim() });
};

onMounted(() => {
  if (!stations?.value.length) {
    store.getWeather("Toshkent");
  } else {
    store.getWeather(stations?.value[0].station.geo.join())
  }
})

</script>

<style lang="scss">
  
</style>