const mongoose=require('mongoose');

//mongodb+srv://admin:admin123@cluster0.5zwlpxd.mongodb.net/?retryWrites=true&w=majority
mongoose.set('strictQuery', false);
const connectDB=async()=>{
    try{
        //mongodb connection string
        console.log(process.env.MONGO_URI)
        const con=await mongoose.connect("mongodb+srv://Chandan:chandan@cluster0.rulvsuc.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useFindAndModify:False,
            // useCreateIndex:true,
        })
        console.log(`MongoDB connected:${con.connection.host}`);
    }
    catch(err){
        console.log(err.message);
        process.exit(1)
    }
}

module.exports=connectDB;