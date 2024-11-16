// Importing necessary modules and packages
const express = require("express");
const app = express();
const authRoutes = require("../routes/auth.route.js");
const userRoutes = require("../routes/users.route.js");

const database = require("../config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

// Setting up port numbe
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();
 
// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Setting up routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// Testing the server
app.get("/", (req, res) => {
	res.send("<h1> Arogya- A complete HealthCare Platform </h1>")
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

// End of code.
