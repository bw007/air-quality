import axios from "axios";
import { defineStore } from "pinia";
import { urlData } from "./env";
import { ref } from "vue";

export const apiStore = defineStore("apiStore", () => {
  const city = ref({})
  const countries = ref([])
  const cityCoord = ref({})
  const loading = ref(false)

  // GET stations
  const getStation = async (payload) => {
    city.value = {}
    loading.value = true
    let res = await axios.get(`${urlData.url}/${payload.url}`, {
      params: {
        token: urlData.token,
        ...payload.params
      }
    }).catch((err) => {
      console.log(err);
    })

    city.value = {...res.data.data}
    
    getCityCoordinates({lat: city.value?.city?.geo[0], lon: city.value?.city?.geo[1]})
    loading.value = false
  }

  // GET all countries
  const getCountries = async () => {
    let res = await axios.get(`${urlData.airUrl}/countries`, {
      params: {
        key: urlData.air_key
      }
    }).catch((err) => {
      console.log(err);
    })

    countries.value = [...res.data.data]
    console.log(countries.value);
  }

  // GET city GPS coordinates
  const getCityCoordinates = async (params) => {
    countries.value = []
    let res = await axios.get(`${urlData.airUrl}/nearest_city`, {
      params: {
        key: urlData.air_key,
        ...params
      }
    }).catch((err) => {
      console.log(err);
    })
    
    countries.value = [{ ...city.value, ...res.data.data }]
    console.log(countries.value);
  }

  return {
    city,
    countries,
    cityCoord,
    loading,

    getStation,
    getCountries,
    getCityCoordinates
  }
})