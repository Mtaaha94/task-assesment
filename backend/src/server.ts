import dotenv from "dotenv";
import app from "./app";
import connectDB from "./db/db";

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
