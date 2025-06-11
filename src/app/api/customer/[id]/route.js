import { NextResponse } from "next/server"
import dbconnection from '../../../lib/dbConnection'
import restaurantUser from '../../../models/restaurantsUserModel'
import foods from '../../../models/foodsModel'

export async function GET(request,context) {
    // console.log(context.params.id)
    const {id}=context.params
    try {
       await dbconnection()
      const restaurantData= await restaurantUser.findOne({_id:id})
      const foodData=await foods.find({resto_id:id})
         if (!restaurantData) {
      return NextResponse.json({ success: false, message: "Restaurant not found" }, { status: 404 });
    }
      return NextResponse.json({success:true,restaurantData,foodData   },{status:200})
    } catch (error) {
         return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
    }
}