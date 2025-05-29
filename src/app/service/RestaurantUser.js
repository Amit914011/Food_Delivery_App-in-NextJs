import { httpAxios } from "../lib/http-request";

export async function addRestaurantUserAPI(data) {
    const result=await httpAxios.post('/api/restaurantsignup',data).then((Response)=>Response)
    return result;
}