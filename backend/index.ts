import express from "express";
import cors from "cors";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

import restaurantRouter from "./routes/restaurantRoutes";
import reviewRouter from "./routes/reviewRoutes";

const app = express();

const PORT = process.env.PORT || "3000";

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Restaurant Review API is running",
  });
});

app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/restaurants", restaurantRouter);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
