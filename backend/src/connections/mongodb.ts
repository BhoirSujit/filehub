import mongoose from "mongoose";

const connectDB = async (con: string) => {
    console.log("db connection process begin");
    await mongoose.connect(con)
    .then( ()=> {
        console.log(`MongoDB Connected`);
    })
    .catch( e => {
        console.error("MongoDB Connection Error:", e);
    })
};

export default connectDB;
