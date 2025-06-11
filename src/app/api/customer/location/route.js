import { NextResponse } from "next/server";
import dbconnection from '../../../lib/dbConnection'
import restaurantuser from '../../../models/restaurantsUserModel'

export async function GET(request) {
    try {
       await dbconnection()
      let result= await restaurantuser.find()
      result=result.map((item)=>item.city.charAt(0).toUpperCase()+item.city.slice(1))
      result=[...new Set(result.map((item)=>item))]
        return NextResponse.json({success:true,result},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal server error",error},{status:500})
    }
    
}