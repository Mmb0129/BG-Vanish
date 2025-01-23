import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/bg-vanish`, {
            serverSelectionTimeoutMS: 5000, // Optional: Timeout if the server is unreachable
        });

        console.log("Database Connected");

        mongoose.connection.on('disconnected', () => {
            console.warn("Database Disconnected");
        });
    } catch (error) {
        console.error("Database Connection Failed:", error.message);
        process.exit(1); // Exit the application
    }
};

export default connectDB;
