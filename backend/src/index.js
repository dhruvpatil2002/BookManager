import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./Routes/authRoutes.js";
import bookRoutes from "./Routes/bookRoute.js";

import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();


const allowedOrigins = [
  "http://localhost:3000",
 "https://book-manager-mu-brown.vercel.app",
];


app.use(cors({
  origin: [
process.env.CLIENT_URL,   
    "http://localhost:3000"                       
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

    



app.use(express.json());

app.use(cookieParser());


app.get("/", (req,res)=>{
  res.json({
    message:"API is running..."
  });
});


app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);


app.use(notFound);
app.use(errorHandler);


export default app;