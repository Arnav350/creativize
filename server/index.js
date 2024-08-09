import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import generateRoutes from "./routes/generateRoutes.js";
import variationRoutes from "./routes/variationRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/post", postRoutes);
app.use("/api/generate", generateRoutes);
app.use("/api/variation", variationRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from Creativize");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(4000, () => console.log("Server has started on port http://localhost:4000"));
  } catch (err) {
    console.log(err);
  }
};

startServer();
