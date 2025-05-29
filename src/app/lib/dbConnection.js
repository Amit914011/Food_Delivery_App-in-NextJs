import mongoose from "mongoose"

const dbconnection=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
              useNewUrlParser: true,
        })
         console.log('✅ MongoDB connected successfully...');
    } catch (error) {
         console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
    }
}
export default dbconnection;