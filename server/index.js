import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import recommendRoutes from "./routes/recommend.js";
import predictRoutes from "./routes/predict.js";
import sendRoutes from "./routes/send.js";
import reviewRoutes from "./routes/review.js";
import chatRoutes from "./routes/chat.js";
/*CONFIGURATION*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use(bodyParser.json());

//ROUTES
app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/recommend",recommendRoutes);
app.use("/predict",predictRoutes);
app.use("/send_email",sendRoutes);
app.use("/review",reviewRoutes);
app.use("/chat",chatRoutes);

//MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log("ihy")
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));