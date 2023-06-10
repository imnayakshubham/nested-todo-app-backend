import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
    }
};


export default connectDB;