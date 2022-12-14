const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const messagesRoutes = require("./routes/messagesRouter");
const helmet = require("helmet");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
mongoose
  .connect(
    `mongodb+srv://${process.env.USER_MONGO}:${process.env.PW_MONGO}@${process.env.CLUSTER_MONGO}.2sihgh3.mongodb.net/groupomania?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
app.use(express.json());

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
