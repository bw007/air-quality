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
        {{ city.location?.name }},
        {{ city.location?.country }},
        {{ convertDate(city.location?.localtime) }}
      </div>
      <div style="display: flex; align-items: center; gap: 5px; margin-top: 10px;">
        <el-image :src="city.current?.condition.icon" fit="cover" />
        <el-text style="font-size: 40px;">
          {{ degree == 1 ? city.current?.temp_c.toFixed() : city.current?.temp_f.toFixed() }}
        </el-text>
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
          <el-popover placement="top-start" trigger="hover" content="Selsiy">
            <template #reference>
              <el-text size="large" :type="degree == 1 ? 'primary' : 'info'" style="cursor: pointer;" @click="degree = 1">&#x2103;</el-text>
            </template>
          </el-popover>
          <el-divider direction="vertical" />
          <el-popover placement="top-start" trigger="hover" content="Farengeyt">
            <template #reference>
              <el-text size="large" :type="degree == 2 ? 'primary' : 'info'" style="cursor: pointer;" @click="degree = 2">&#8457;</el-text>
            </template>
          </el-popover>
        </div>
        <el-row>
          <el-text>Namlik: {{ city.current?.humidity }}%</el-text>
          <el-text>Shamol: {{ city.current?.wind_kph }} km/s</el-text>
        </el-row>
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
    store.getWeather("Qarshi");
  } else {
    store.getWeather(stations?.value[0].station.geo.join())
  }
})

</script>

<style lang="scss">
  
</style>