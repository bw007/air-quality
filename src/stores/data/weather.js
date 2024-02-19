import { storeToRefs } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";
import { urlData } from "../utils/env";

export const weatherStore = storeToRefs("weatherStore", () => {
  const api = apiStore()
  const city = ref({})

  const getWeather = async (payload) => {
    let res = await api.get()
  }

  return {
    city,

    getWeather
  }
})