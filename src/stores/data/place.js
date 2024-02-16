import { defineStore } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";
import { urlData } from "../utils/env";

export const placeStore = defineStore("placeStore", () => {
  const api = apiStore();
  const forecast = ref([])

  const flags = ref({});
  const stations = ref([]);
  const loading = ref(false);

  const getStation = async (payload) => {
    loading.value = true;

    let res = await api.get({
      url: `${urlData.waqiUrl}/${payload.route}/`,
      params: { token: urlData.waqiToken, keyword: payload.keyword },
    });

    if (res?.status == 200) {
      forecast.value = []
      stations.value = [
        ...await Promise.all(res.data.data.map(async (item) => {
          
          let translate = await api.get({
            url: urlData.translateUrl, 
            params: { key: urlData.apiKey, PROJECT_NUMBER_OR_ID: "ethereal-beach-413910", q: item.station.name, target: "uz" } 
          })

          let frc = await api.get({ 
            url: `${urlData.waqiUrl}/feed/geo:${item.station.geo.join(";")}/`, 
            params: { token: urlData.waqiToken }
          })

          if (!item.station.country) {
            let cn = await getCntryData(item.station.geo.join())
            return {
              ...item,
              forecast: { ...frc.data?.data.forecast },
              iaqi: { ...frc.data?.data.iaqi },
              country: cn.data?.plus_code?.compound_code?.split(", ").pop().toLowerCase(),
              station: {...item.station, name: translate.data.data.translations[0].translatedText}
            }
          }
          
          return {
            ...item,
            forecast: { ...frc.data?.data.forecast },
            iaqi: { ...frc.data?.data.iaqi },
            station: { ...item.station, name: translate.data.data.translations[0].translatedText }
          };

        })),
      ];
    }
    forecast.value = [...stations.value.map(item => {
      return {
        forecast: { ...item.forecast },
        name: item.station.name
      }
    })]

    console.log(forecast.value);
    loading.value = false;
  };
  
  const getCntryData = (geo) => {
    return api.get({ url: urlData.mapsUrl, params: { latlng: geo, key: urlData.apiKey } })
  }

  return {
    flags,
    stations,
    loading,
    forecast,

    getStation,
  };
});
