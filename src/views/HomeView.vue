<template>
  <main>
    <el-table :data="countries">
      <el-table-column type="index" label="№" width="180"/>
      <el-table-column prop="country" label="Flag" width="180">
        <template #default="list">
          <el-image :src="`https://cdn.airvisual.net/flags/${list.row.country.toLowerCase()}.jpg`" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column prop="country" label="Country" />
    </el-table>
  </main>
</template>

<script setup>
import { apiStore } from "@/stores/utils/api";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = apiStore()
const { city, countries } = storeToRefs(store)

onMounted(() => {
  store.getStation({url: `feed/${'tashkent'}/`})
  store.getCountries()
  console.log(city);
})

</script>