const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("access-control-allow-credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT, POST,DELETE,UPDATE");
  next();
});
dotenv.config();

// ! USE your mongo db credentials
const Mongo_url = process.env.MONGO_URL;
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
//to connect the mongodb url
mongoose
  .connect("mongodb+srv://gautham:gautham@blog.jcckq.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MongoDb"))
  .catch((err) => console.log(err));
// to upload images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//matching paths
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Backend is running on Port " + PORT);
});



//const MONGO_URL = process.env.MONGO_URL;
// async function createConnection(){
//   const client= new MongoClient(MONGO_URL);
//   await client.connect(); // promise
//   return client;
// }
