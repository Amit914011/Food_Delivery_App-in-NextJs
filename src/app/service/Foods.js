import { httpAxios } from "../lib/http-request";

export async function addFoodDataAPI(food) {
    const result = await httpAxios.post('/api/restaurant/foods',food).then((Response)=>Response.data)
    return result;
}


export async function getAllFoodDataAPI(resto_id) {
    const result = await httpAxios.get(`/api/restaurant/foods/${resto_id}`).then((Response)=>Response.data)
    return result;
}

export async function deleteFoodDataAPI(food_id) {
     const result = await httpAxios.delete(`/api/restaurant/foods/${food_id}`).then((Response)=>Response.data)
    return result;
}