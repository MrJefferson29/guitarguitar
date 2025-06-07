const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

mongoose.set('strictQuery', false);

const indexRouter = require("./Routers/index");
const storyRouter = require("./Routers/story");
const connectDatabase = require("./Helpers/database/connectDatabase");
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");

dotenv.config({
    path: './.env'
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

connectDatabase();

app.use(express.json());
app.use(cors());

app.use("/", indexRouter);
app.use("/story", storyRouter);

app.use(customErrorHandler);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} : ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});
