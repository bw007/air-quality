import { defineStore } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";
import { urlData } from "../utils/env";

export const statisticStore = defineStore("statisticStore", () => {
  const api = apiStore()
  const loading = ref(false)
  const forecast = ref({})

  const getForct = async (payload) => {
    let res = await api.get({
      url: `${urlData.waqiUrl}/${payload.route}/`,
      params: { token: urlData.waqiToken },
    });

    if (res.status == 200) {
      forecast.value = [...res.data.data.forecast.daily.pm25]
      loading.value = true
      console.log(forecast.value);
    }
  }

  return {
    forecast,
    loading,

    getForct
  }

})