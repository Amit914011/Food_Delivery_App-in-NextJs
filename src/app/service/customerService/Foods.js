import { httpAxios } from "../../lib/http-request"

export async function getRestaurantLocationAPI() {
    const result = await httpAxios.get('/api/customer/location').then((Response)=>Response.data)
    return result;
}

export async function getRestaurantForHomePageAPI() {
    const result = await httpAxios.get('/api/customer').then((Response)=>Response.data)
    return result;
}

export async function getRestaurantAndFoodAPI(data) {
    const result=await httpAxios.get(`/api/customer/${data}`)
    return result;
}