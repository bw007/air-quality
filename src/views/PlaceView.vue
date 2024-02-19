<template>
  <section>
    <h1 style="margin-bottom: 15px">Stansiyalarni qidirish</h1>
    <el-input
      v-model="search"
      @change="handleSearch(search)"
      clearable
      placeholder="Misol: Jakarta"
    />
    <p v-show="!loading" style="margin-top: 15px;">Topilgan stansiyalar: {{ stations_count }}</p>
    <el-table
      height="75vh"
      :data="stations"
      style="width: 100%; margin-top: 10px"
      v-loading="loading"
      element-loading-text="Aniqlanmoqda..."
      border
      :empty-text="stations.length > 0 ? '' : `Ma'lumot topilmadi. Ingliz tilida qidirish ustunlik beradi`"
    >
      <el-table-column align="center" type="index" label="№" width="45" />
      <el-table-column align="center" header-align="center" label="Mamlakat" width="90">
        <template #default="list">
          <el-image
            style="display: flex; align-items: center; justify-content: center; width: 34px; height: 23px;"
            :src="list.row.station.country 
              ? `https://flagcdn.com/h24/${list.row.station.country?.toLowerCase()}.webp`
              : `https://cdn.airvisual.net/flags/${list.row.country?.split(' ').join('-')}.jpg`"
          >
            <template #error>
              <el-icon :size="18">
                <Picture />
              </el-icon>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="station.name" label="Stansiya nomi" min-width="250" />
      <el-table-column prop="time.stime" label="Sana" width="120">
        <template #default="list">
          {{ convertDate(list.row.time.stime) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="iaqi.so2.v" width="90">
        <template #header>
          SO<sub>2</sub>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="iaqi.o3.v" width="90">
        <template #header>
          O<sub>3</sub>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="iaqi.pm10.v" width="90">
        <template #header>
          PM<sub>10</sub>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="aqi" width="150">
        <template #header>
          Indeks (PM<sub>2.5</sub>)
        </template>
        <template #default="list">
          <el-popover
            placement="left"
            :title="aqDegree(list.row.aqi).rate"
            :width="250"
            trigger="hover"
            :content="aqDegree(list.row.aqi).desc"
            :popper-style="{ 
              backgroundColor: aqDegree(list.row.aqi).clr, 
              color: aqDegree(list.row.aqi).clr == '' ? '#000' : '#fff' 
            }"
          >
            <template #reference>
              <el-button :color="aqDegree(list.row.aqi).clr" style="width: 55px;">{{ list.row.aqi }}</el-button>
            </template>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script setup>
import { placeStore } from "@/stores/data/place";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { aqDegree, convertDate } from "@/stores/utils/func";

const store = placeStore();

const { loading, stations, stations_count } = storeToRefs(store)

let search = ref("");

const handleSearch = async (val) => {
  if (!val) return
  store.getStation({route: "search", keyword: val.trim()});
};

onMounted(() => {
  if (!stations.value.length) {
    store.getStation({route: "search", keyword: "Tashkent"});
  }
})

</script>

<style lang="css">
.el-table_1_column_2.is-center .cell {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
