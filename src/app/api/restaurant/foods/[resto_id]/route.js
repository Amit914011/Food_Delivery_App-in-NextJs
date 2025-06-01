import { NextResponse } from "next/server"
import dbconnection from "../../../../lib/dbConnection";
import food from '../../../../models/foodsModel'

export async function GET(request,context) {
    const {resto_id}=context.params
    // console.log(resto_id)
      if (!resto_id) {
    return Response.json({ error: "resto_id is required" }, { status: 400 });
  }

  try {
    await dbconnection()
    const foods=await food.find({resto_id})
     return NextResponse.json({success:true,data:foods},{status:200})
  } catch (error) {
     return Response.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }

   
}


export async function DELETE(request,context) {
    const id=context.params.resto_id
    if(!id){
      return Response.json({ error: "resto_id is required" }, { status: 400 });
    }
    try {
      await dbconnection()
     const deleteFood=await food.deleteOne({_id:id})
     return NextResponse.json({message:"Food deleted successfull..",success:true,food:deleteFood},{status:200})
    } catch (error) {
     return NextResponse.json({error:"Internal server error"},{status:500}) 
    }
}