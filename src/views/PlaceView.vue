<template>
  <section>
    <h1 style="margin-bottom: 20px;">Shaharni qidirish</h1>
    <el-input v-model="search" @change="handleSearch(search)" clearable placeholder="Country" />
    <el-table :data="tableData" border style="width: 100%; margin-top: 40px;">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </section>
</template>

<script setup>
import { placeStore } from '@/stores/data/place';
import { onMounted, ref } from 'vue';

const store = placeStore()

let search = ref('')

const handleSearch = (val) => {
  console.log(val);
}

const tableData = ref([
  {
    date: new Date().getFullYear(),
    name: "John Doe",
    address: "Washington, USA"
  }
])

onMounted(() => {
  store.getPlace({url: ""})
})

</script>

<style lang="">
  
</style>