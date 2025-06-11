import { NextResponse } from "next/server";
import dbconnection from "../../lib/dbConnection";
import RestaurantUser from "../../models/restaurantsUserModel";

export async function GET(request) {
  await dbconnection();

  const queryParams = request.nextUrl.searchParams;
//   console.log(queryParams.get("location"));

  let filter = {};

  const location = queryParams.get("location");
  const restaurantName = queryParams.get("restaurant");
  if (location) {
    // OR use regex for case-insensitive:
    filter.city = { $regex: new RegExp(location, "i") };
  }
  if(restaurantName){
    // OR use regex for case-insensitive:
    filter.restaurant={$regex: new RegExp(restaurantName,'i')}
  }

  try {
    const result = await RestaurantUser.find(filter).select("-password");

    return NextResponse.json({ success: true, data: result },{status:200});
  } catch (error) {
    return NextResponse.json({error:"Internal Server Error",error},{status:500})
  }
}
