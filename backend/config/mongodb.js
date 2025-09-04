import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("MongoDB connection successful"));

        await mongoose.connect(`${process.env.MONGODB_URI}/doclynk`)
    } catch (error) {
        console.log(error)
    }

}
export default connectDB;