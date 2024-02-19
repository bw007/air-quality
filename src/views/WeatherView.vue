<template>
  <section>
    <h1 style="margin-bottom: 15px">Manzilni qidirish</h1>
    <el-input
      v-model="search"
      @change="handleSearch(search)"
      clearable
      placeholder="Misol: Jakarta"
    />
  </section>
</template>

<script setup>
import { weatherStore } from "@/stores/data/weatherStore";

import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
// import { convertDate } from "@/stores/utils/func";

const store = weatherStore();

const { city } = storeToRefs(store);

let search = ref("");

const handleSearch = async (val) => {
  if (!val) return
  store.getWeather({route: "search", keyword: val.trim()});
};

  onMounted(() => {
    if (!stations?.value.length) {
      store.getStation({ route: "search", keyword: "Tashkent" });
    }
  })

</script>

<style lang="scss">
  
</style>