import mongoose, { connect } from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async (MONGO_URI: string): Promise<void> => {
  try {
    await connect(MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
