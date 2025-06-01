import {  NextResponse } from "next/server"
import dbconnection from "../../../lib/dbConnection"
import food from "../../../models/foodsModel"

export async function POST(request) {
    await dbconnection()
    const {foodname,category,price,description,imageurl,resto_id}=await request.json()
    console.log(foodname,category,price,description,imageurl,resto_id)
    if(!foodname || foodname.trim()=="") return NextResponse.json({error:"Food name is required"},{status:400})
    if(!category || category.trim()=="") return NextResponse.json({error:"Categories name is required"},{status:400})
    if(price === undefined || price === null ||  price=="") return NextResponse.json({error:"Price is required"},{status:400})
    if(!description || description.trim()=="") return NextResponse.json({error:"Description is required"},{status:400})
    if(!imageurl || imageurl.trim()=="") return NextResponse.json({error:"Image URL is required"},{status:400})
    try {
        const newFood=new food({foodname,category,price,description,imageurl,resto_id})
        await newFood.save()
        return NextResponse.json({ success: true, message: "Food item added successfully" ,food:newFood},{status:201});
    } catch (error) {
        return NextResponse.json({ error: "Internal server error", details: error }, { status: 500 });
    }
}