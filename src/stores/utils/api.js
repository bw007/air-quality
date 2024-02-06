import axios from "axios";
import { defineStore } from "pinia";
import { urlData } from "./env";
import { ref } from "vue";

export const apiStore = defineStore("apiStore", () => {
  const city = ref({})
  const countries = ref([])

  const getStation = async (payload) => {
    let res = await axios.get(`${urlData.url}/${payload.url}`, {
      params: {
        token: urlData.token,
        ...payload.params
      }
    }).catch((err) => {
      console.log(err);
    })


    city.value = {...res.data.data}
  }

  const getCountries = async () => {
    let res = await axios.get(`${urlData.airUrl}/countries`, {
      params: {
        key: urlData.air_key
      }
    })
    countries.value = [...res.data.data]
    console.log(countries.value);
  }

  return {
    city,
    countries,
    getStation,
    getCountries
  }
})