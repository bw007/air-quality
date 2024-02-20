import { defineStore } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";
import { urlData } from "../utils/env";

export const translateStore = defineStore("translateStore", () => {
  const api = apiStore()
  const text = ref([])

  const getTranslate = async (payload) => {
    let res = await api.get({
      url: urlData.translateUrl, 
      params: { 
        key: urlData.apiKey, 
        PROJECT_NUMBER_OR_ID: "ethereal-beach-413910", 
        q: payload, 
        target: "uz" 
      } 
    })

    if (res.status == 200) {
      text.value = [ ...res.data.data.translations ]
      console.log(text.value);
    }
  }

  return {
    text,

    getTranslate
  }
})