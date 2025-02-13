import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import eventsRoutes from "./routes/event.routes.js";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
     /*  "https://fausti-oro.vercel.app",
      "https://www.orofaustino.com", */
    ],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

app.use(cookieParser());

app.use("/api/events", eventsRoutes);
app.use("/api/auth", authRoutes);

export default app;
