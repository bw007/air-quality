import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { urlData } from "./env";

export const apiStore = defineStore("apiStore", () => {
  
  const countries = ref([])

  const getAllCountries = async (payload) => {
    let res = await axios.get(`${urlData.url}/${payload.url}`, {
      params: {
        key: urlData.API_KEY,
        ...payload.params
      }
    }).catch((err) => {
      console.log(err);
    })

    countries.value = [...res.data.data]
  }

  return {
    countries,

    getAllCountries
  }
})