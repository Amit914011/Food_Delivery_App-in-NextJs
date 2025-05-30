import { NextResponse } from "next/server";
import dbconnection from "../../../lib/dbConnection";
import RestaurantUser from '../../../models/restaurantsUserModel'

export async function POST(request) {
    await dbconnection()
    const {email,password}=await request.json()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.trim()==""){
        return NextResponse.json({error:"Enter your email address"},{status:400})
    }
    if (!emailRegex.test(email)) {
  return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
}
    if(password.trim()==""){
        return NextResponse.json({error:"Enter your password"},{status:400})
    }
    try {
        const restaurantUserData=await RestaurantUser.findOne({email})
        console.log(restaurantUserData)
        if(!restaurantUserData){
             return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        if(restaurantUserData.password !== password){
             return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
          const newRestaurantData = await RestaurantUser
          .findById(restaurantUserData._id)
          .select('-password');
        // console.log(email,password)
        return NextResponse.json({
        message:"Login Successfully.",user:newRestaurantData
    },{status:200})
    } catch (error) {
         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
    
}
