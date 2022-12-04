import axios from "axios";

const geocode = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/geocode"
})
const GEOCODE_API_KEY = process.env.REACT_APP_GEOCODE_API_KEY

export const reverseGeoding = async ({lat, lon, ...options}) => {
    const params = new URLSearchParams({
        latlng: `${lat},${lon}`,
        key: GEOCODE_API_KEY,
        ...options
    })
    const resp = await geocode.get(`/json?${params}`)
    const data = await resp.data
    if (data.status !== 'OK') {
        return null
    }
    return data
}