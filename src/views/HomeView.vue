<template>
  <el-col>
    <el-input

      v-model="search"
      placeholder="Type something"
      @change="handleSearch"
    >
      <template #prefix>
        <el-icon>
          <Search />
        </el-icon>
      </template>
    </el-input>
    <el-table :data="countries" v-loading="loading">
      <el-table-column type="index" label="№" width="50"/>
      <el-table-column prop="country" width="50">
        <template #default="list">
          <el-image
            :style="'width: 30px; display: flex; align-items: center; justify-content: center'"
            :src="`https://cdn.airvisual.net/flags/${list.row.country?.toLowerCase().split(' ').join('-')}.jpg`" 
            fit="cover" 
            :lazy="true"
          >
            <template #error>
              <div :style="'display: flex; align-items: center'" class="image-slot">
                <el-icon>
                  <Picture />
                </el-icon>
              </div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="country" label="Country">
        <template #default="list">
          {{ list.row.city }},
          {{ list.row.state }},
          {{ list.row.country }}
        </template>
      </el-table-column>
      <el-table-column prop="aqi" label="AQI">
        <template #default="list">
          <el-button :type="list.row.current.pollution.aqius < 51 ? 'success' : 'warning'">
            {{ list.row.current.pollution.aqius }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</template>

<script setup>
import { apiStore } from "@/stores/utils/api";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const store = apiStore()
const { countries, loading } = storeToRefs(store)

let search = ref('')

const handleSearch = (val) => {
  search.value = val
  store.getStation({url: `feed/${search.value.toLowerCase()}/`})
}

onMounted(() => {
  // store.getCountries()
  // console.log(city);
  // store.getCityCoordinates({lat: 69.21,lon: 41.26})
})

</script>