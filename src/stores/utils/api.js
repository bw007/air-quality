import axios from "axios";
import { defineStore } from "pinia";

export const apiStore = defineStore("apiStore", () => {

  // GET request
  const get = async (payload) => {
    return await axios.get(`${payload.url}`, {
      headers: { ...payload.headers },
      params: { ...payload.params }
    }).catch((err) => {
      console.log("Xatolik", err);
    })
  }

  return {
    get
  }
})