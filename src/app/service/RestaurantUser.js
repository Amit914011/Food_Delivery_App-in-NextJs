import { httpAxios } from "../lib/http-request";

export async function addRestaurantUserAPI(data) {
    const result=await httpAxios.post('/api/restaurant/signup',data).then((Response)=>Response)
    return result;
}


export async function loginRestaurantUserAPI(data) {
    const result=await httpAxios.post('/api/restaurant/login',data).then((Response)=>Response)
    return result;
}