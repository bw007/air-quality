import { defineStore } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";
import { urlData } from "../utils/env";

export const weatherStore = defineStore("weatherStore", () => {
  const api = apiStore()
  const city = ref({})

  const getWeather = async (payload) => {
    let res = await api.get({ 
      url: urlData.weatherUrl,
      headers: {
        'X-RapidAPI-Key': urlData.weatherKey,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      },
      params: { q: payload }
    })

    if (res?.status == 200) {
      city.value = { ...res.data }
    }
    console.log(city.value);
  }

  return {
    city,

    getWeather
  }
})