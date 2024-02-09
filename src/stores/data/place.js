import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";

export const placeStore = defineStore("placeStore", () => {
  const store = apiStore()
  
  const place = ref({})

  const getPlace = async (payload) => {
    let res = await store.get(payload)
    console.log(res);
  }

  return {
    place,

    getPlace
  }

})