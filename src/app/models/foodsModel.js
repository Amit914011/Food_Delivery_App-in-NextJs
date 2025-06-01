import mongoose from "mongoose";

const foodSchema=new mongoose.Schema({
    foodname:{
        type:String,
        required:[true,'Food name is required']
    },
    category:{
        type:String,
        required:[true,'Categories is required'],
        enum:['Burger','Pizza','Dessert','Drinks']
    },
    
    price:{
        type:Number,
        required:[true,'Price is required'],
        
    },
    description:{
        type:String,
        required:[true,'Description is required'],
        
    },
    
    imageurl:{
        type:String,
        required:[true,'Image URL is required'],
        
    },
     resto_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RestaurantUser'
  }

})

export default mongoose.models.Food || mongoose.model('Food',foodSchema)