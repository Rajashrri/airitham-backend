require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const port = process.env.PORT || 8000;

// Database Connection
const connectDB = require("./utils/db");

// Routes
const authRoute = require("./router/auth-router");
const blogcategoryRoute = require("./router/blogcategory-router");
const profileRoute = require("./router/profile-router");
const testimonialsRoute = require("./router/testimonials-router");
const clientRoute = require("./router/client-router");
const blogRoute = require("./router/blog-router");
const dashboardRoute = require("./router/dashboard-router");


// Middlewares
const errorMiddleware = require("./middlewares/validate-middleware");
const errorMiddleware1 = require("./middlewares/error-middleware");

// ✅ CORS Configuration


const corsOptions = {
  origin: 'https://airitham-front.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
};

// Use the same variable name (case sensitive!)
app.use(cors(corsOptions)); 
app.options('*', cors(corsOptions));

// const corsOptions = {
//   origin: process.env.CORS_ORIGIN, // only from .env
//   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//   credentials: true,
// };

// app.use(cors(corsOptions));

// ✅ Parse JSON
app.use(express.json());

// ✅ Static Files

app.use('/blog', express.static(path.join(__dirname, 'public/blog')));
app.use('/profile', express.static(path.join(__dirname, 'public/profile')));
app.use('/client', express.static(path.join(__dirname, 'public/client')));
app.use('/testimonial', express.static(path.join(__dirname, 'public/testimonial')));

// ✅ API Routes
app.use("/api/auth", authRoute);
app.use("/api/blogcategory", blogcategoryRoute);
app.use("/api/profile", profileRoute);
app.use("/api/testimonial", testimonialsRoute);
app.use("/api/client", clientRoute);
app.use("/api/blog",blogRoute);
app.use("/api/dashboard",dashboardRoute);


// otp
app.use(errorMiddleware);
app.use(errorMiddleware1);
connectDB().then( ()=>{
    app.listen(port, () =>{
        console.log(`server is running at port no ${port}`);
    });
});
