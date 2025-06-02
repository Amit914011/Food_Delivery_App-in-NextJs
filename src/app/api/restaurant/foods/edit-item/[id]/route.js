import { NextResponse } from "next/server"
import dbconnection from "../../../../../lib/dbConnection"
import food from "../../../../../models/foodsModel"




export async function GET(request,context){
    const {id}=context.params
    if(!id){
        return NextResponse.json({error:"Id is required"},{status:400})
    }
    try {
       await dbconnection()
        const result=  await food.findOne({_id:id})
        
    if (!result) {
      return NextResponse.json({ success: false, message: "Food not found" }, { status: 404 });
    }
        return NextResponse.json({success:true,data:result},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Internal server error",error},{status:500})
    }
}

export async function PUT(request,context) {
  const {id}=context.params
     if(!id){
        return NextResponse.json({error:"Id is required"},{status:400})
    }

    try {
         await dbconnection()
        const payload=await request.json()
        console.log(payload)
        if(payload){
            const newData=await food.findByIdAndUpdate(id,payload,{
      new: true, // returns the updated document
      runValidators: true, // ensures schema validation
    })
     if (!newData) {
      return NextResponse.json({ success: false, message: "Food item not found" }, { status: 404 });
    }
             return NextResponse.json({success:true,message:"Update Successfull...",result:newData},{status:200})
        }
    } catch (error) {
         return NextResponse.json({success:false,message:"Internal server error.",error})
    }

 
}