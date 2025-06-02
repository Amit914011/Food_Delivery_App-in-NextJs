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



export async function getFoodDataByIdAPI(food_id) {
    const result=await httpAxios.get(`/api/restaurant/foods/edit-item/${food_id}`).then((Response)=>Response.data)
    return result;
}


export async function updateFoodItemAPI(food_id,data) {
    const result = await httpAxios.put(`/api/restaurant/foods/edit-item/${food_id}`,data).then((Response)=>Response.data)
    return result;
}