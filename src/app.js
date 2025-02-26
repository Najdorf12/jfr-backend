import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import eventsRoutes from "./routes/event.routes.js";
import emailRoutes from "./routes/email.routes.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173" , "https://jfr-front2.vercel.app"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

app.use(cookieParser());

app.use("/api/events", eventsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/send-email", emailRoutes);

export default app;
