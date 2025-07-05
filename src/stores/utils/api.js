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

  const post = async (payload) => {
    return await axios.post(`${payload.url}`, payload.data, {
      headers: { ...payload.headers },
      params: { ...payload.params } // optional: agar URL param kerak bo‘lsa
    }).catch((err) => {
      console.log("POST xatolik:", err.response?.data || err.message);
    });
  };

  return {
    get,
    post
  }
})