import { defineStore } from "pinia";
import { apiStore } from "../utils/api";
import { urlData } from "../utils/env";

export const translateStore = defineStore("translateStore", () => {
  const api = apiStore()

  const getTranslate = async (word) => {
    const url = `${urlData.translateUrl}?key=${urlData.apiKey}`;
  
    const body = {
      q: word,
      target: 'uz',
      format: 'text'
    };
  
    let res = await api.post({
      url,
      data: body,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (res?.status == 200) return res?.data?.data?.translations[0].translatedText;
  }  

  return {
    getTranslate
  }
})