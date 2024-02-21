import { defineStore } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";
import { urlData } from "../utils/env";
import { translateStore } from "./translate";

export const weatherStore = defineStore("weatherStore", () => {
  const api = apiStore()
  const tr = translateStore()
  const city = ref({})
  const load = ref(false)

  const getWeather = async (payload) => {
    load.value = true;
    let res = await api.get({ 
      url: urlData.weatherUrl,
      headers: {
        'X-RapidAPI-Key': urlData.weatherKey,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      },
      params: { q: payload }
    })

    if (res?.status == 200) {
      city.value = { ...res.data, location: { ...res.data.location, country: await tr.getTranslate(res.data.location.country + " ") } }
    }
    load.value = false;
    console.log(city.value.current);
  }

  return {
    city,
    load,

    getWeather
  }
})