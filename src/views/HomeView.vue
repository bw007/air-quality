<template>
  <main>
    Air Quality
  </main>
</template>

<script setup>
import { apiStore } from "@/stores/utils/api";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = apiStore()
const { countries } = storeToRefs(store)

onMounted(() => {
  store.getAllCountries({url: "countries"})
  console.log(countries.value);
  
})

</script>