import { storeToRefs } from "pinia";
import { ref } from "vue";

export const weatherStore = storeToRefs("weatherStore", () => {
  const city = ref({})

  

  return {
    city
  }
})