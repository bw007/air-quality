import { defineStore } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";
import { urlData } from "../utils/env";

export const statisticStore = defineStore("statisticStore", () => {
  const api = apiStore()
  const forecast = ref({})

  const getForct = async (payload) => {
    let res = await api.get({
      url: `${urlData.waqiUrl}/${payload.route}/`,
      params: { token: urlData.waqiToken },
    });

    if (res.status == 200) {
      console.log(res.data.data.forecast.daily);
      forecast.value = {...res.data.data.forecast.daily}
    }
  }

  return {
    forecast,

    getForct
  }

})