import mongoose from "mongoose";


const connectionDB = async () =>{

try{
   
    if(mongoose.connection.readyState >=1){
        console.log("already connected")
        return
    }
    await mongoose.connect(process.env.MONGO_URI)
    console.log("the databse is successfully conntected")
}
catch(error){
    console.log("something went wrong in the connection", error)
}

}
export default connectionDB;