import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";
import { urlData } from "../utils/env";
import { translateStore } from "./translate";

export const placeStore = defineStore("placeStore", () => {
  const api = apiStore();
  const tr = translateStore()
  const { text } = storeToRefs(tr)
  const forecast = ref([])

  const flags = ref({});
  const stations = ref([]);
  const stations_count = ref(0)
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

          let frc = await api.get({ 
            url: `${urlData.waqiUrl}/feed/geo:${item.station.geo.join(";")}/`, 
            params: { token: urlData.waqiToken }
          })

          await tr.getTranslate(item.station.name)
          if (!item.station.country) {
            let cn = await getCntryData(item.station.geo.join())
            return {
              ...item,
              forecast: { ...frc.data?.data.forecast },
              iaqi: { ...frc.data?.data.iaqi },
              country: cn.data?.plus_code?.compound_code?.split(", ").pop().toLowerCase(),
              station: {...item.station, name: text.value[0].translatedText}
            }
          }
          console.log(text.value);
          return {
            ...item,
            forecast: { ...frc.data?.data.forecast },
            iaqi: { ...frc.data?.data.iaqi },
            station: { ...item.station, name: text.value[0].translatedText }
          };

        })),
      ];
    }
    stations_count.value = stations.value.length
    forecast.value = [...stations.value.map(item => {
      return {
        forecast: { ...item.forecast },
        name: item.station.name
      }
    })]

    console.log(stations.value[0].station.geo.join());
    loading.value = false;
  };
  
  const getCntryData = (geo) => {
    return api.get({ url: urlData.mapsUrl, params: { latlng: geo, key: urlData.apiKey } })
  }

  return {
    flags,
    stations,
    stations_count,
    loading,
    forecast,

    getStation,
  };
});
