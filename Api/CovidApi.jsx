import { fetchJSON } from "../HTTP/https"

export const Api = () => {

    const systemApi = {
        getCovidData: async () => await fetchJSON("https://disease.sh/v3/covid-19/countries")
    }

    return systemApi;
}