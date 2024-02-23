<template>
  <section>
    <h1 style="margin-bottom: 20px">{{ $route.meta.text }}</h1>
    <el-text>Manzilni qidirish</el-text>
    <el-input
      v-model="search"
      @change="handleSearch(search)"
      clearable
      placeholder="Misol: Jakarta"
      style="margin-bottom: 20px; margin-top: 5px;"
    />
    
    <el-skeleton v-if="load" animated>
      <template #template>
        <el-skeleton-item variant="circle" style="width: 50px; height: 50px;" />
        <div style="padding: 5px; width: 300px;">
          <el-skeleton-item variant="h1" style="width: 200px" />
          <div style="margin-top: 10px;">
            <el-skeleton-item variant="text"  />
            <el-skeleton-item variant="text" />
          </div>
        </div>
      </template>
    </el-skeleton>
    <div v-else>
      <div>
        <el-button type="warning" plain @click="store.getWeather(city.location?.name)">
          <span v-html="city.location?.name"></span>
        </el-button>
        <el-button type="warning" plain @click="store.getWeather(city.location?.country)">
          <span v-html="city.location?.country_uz"></span>
        </el-button>
      </div>
      <div style="display: flex; align-items: center; gap: 5px; margin-top: 10px; max-width: 600px;">
        <el-image :src="city.current?.condition.icon" fit="cover" />
        <el-text style="font-size: 40px;">
          {{ degree == 1 ? city.current?.temp_c.toFixed() : city.current?.temp_f.toFixed() }}
        </el-text>
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
          <el-tooltip effect="dark" content="Selsiy" placement="top-start">
            <el-text size="large" :type="degree == 1 ? 'primary' : 'info'" style="cursor: pointer;" @click="degree = 1">&#x2103;</el-text>
          </el-tooltip>
          <el-divider direction="vertical" />
          <el-tooltip effect="dark" content="Farengeyt" placement="top-start">
            <el-text size="large" :type="degree == 2 ? 'primary' : 'info'" style="cursor: pointer;" @click="degree = 2">&#8457;</el-text>
          </el-tooltip>
        </div>
        <div style="display: flex; flex-direction: column; margin-top: 8px; margin-left: 10px;">
          <el-text size="small" style="align-self: auto;">Namlik: {{ city.current?.humidity }}%</el-text>
          <el-text size="small" style="align-self: auto;">Shamol: {{ city.current?.wind_kph }} km/s</el-text>
          <el-text size="small" style="align-self: auto;">UV indeks: {{ city.current?.uv }}</el-text>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; margin-left: auto;">
          <el-text size="large" style="align-self: auto;" >
            {{ convertDate(city.location?.localtime) }}
          </el-text>
          <el-text size="large" style="align-self: auto;" type="primary">
            <span v-html="city.current?.condition?.text"></span>
          </el-text>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { weatherStore } from "@/stores/data/weather";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { convertDate } from "@/stores/utils/func";
import { placeStore } from "@/stores/data/place";

const place = placeStore()
const store = weatherStore()

const { stations } = storeToRefs(place)
const { city, load } = storeToRefs(store);

let search = ref("");
const degree = ref(1)

const handleSearch = async (val) => {
  if (!val) return
  store.getWeather(val.trim());
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