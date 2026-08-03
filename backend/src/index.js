import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./Routes/authRoutes.js";
import bookRoutes from "./Routes/bookRoute.js";

import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();


const allowedOrigins = [
  "http://localhost:3000",
  "https://book-manager-o23y3crh6-dhruvpatil2002s-projects.vercel.app",
];


app.use(
  cors({
    origin: function (origin, callback) {

      // allow requests without origin (Postman, mobile apps)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS"
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ],
  })
);


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