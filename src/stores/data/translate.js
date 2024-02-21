import { defineStore } from "pinia";
import { apiStore } from "../utils/api";
import { urlData } from "../utils/env";

export const translateStore = defineStore("translateStore", () => {
  const api = apiStore()

  const getTranslate = async (word) => {
    let res = await api.get({
      url: urlData.translateUrl, 
      params: { 
        key: urlData.apiKey, 
        PROJECT_NUMBER_OR_ID: "ethereal-beach-413910", 
        q: word, 
        target: "uz" 
      } 
    })

    if (res.status == 200) {
      return res.data.data.translations[0].translatedText
    }
  }

  return {
    getTranslate
  }
})