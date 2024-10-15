// require("dotenv").config();

// const path = require("path");
// const express = require("express");
// const mongoose = require("mongoose");
// const cookiePaser = require("cookie-parser");

// const Blog = require("./models/blog");

// const userRoute = require("./routes/user");
// const blogRoute = require("./routes/blog");

// const {
//   checkForAuthenticationCookie,
// } = require("./middlewares/authentication");

// const app = express();
// const PORT = process.env.PORT || 8000;

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then((e) => console.log("MongoDB Connected"));

// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

// app.use(express.urlencoded({ extended: false }));
// app.use(cookiePaser());
// app.use(checkForAuthenticationCookie("token"));
// app.use(express.static(path.resolve("./public")));

// app.get("/", async (req, res) => {
//   const allBlogs = await Blog.find({});
//   res.render("home", {
//     user: req.user,
//     blogs: allBlogs,
//   });
// });

// app.use("/user", userRoute);
// app.use("/blog", blogRoute);

// app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));



require("dotenv").config(); // Load environment variables from .env file

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); // Fixed typo: "cookiePaser" to "cookieParser"

const Blog = require("./models/blog"); // Ensure this path is correct and that Blog is exported properly

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose
   .connect(process.env.MONGO_URL)
   .then((e) => console.log("MongoDB Connected"));

app.set("view engine", "ejs"); // Set the view engine to EJS
app.set("views", path.resolve("./views")); // Set the views directory

app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(checkForAuthenticationCookie("token")); // Custom middleware for authentication
app.use(express.static(path.resolve("./public"))); // Serve static files from the public directory

// Home route to render all blogs
app.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.find({}); // Fetch all blogs from the database
    res.render("home", {
      user: req.user, // Pass user info if available
      blogs: allBlogs, // Pass fetched blogs to the view
    });
  } catch (error) {
    console.error("Error fetching blogs:", error); // Log any errors that occur
    res.status(500).send("Internal Server Error"); // Send a 500 response if there's an error
  }
});

// Use user and blog routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);

// Start the server
// app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started at PORT: ${PORT}`);
});