const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { mogoUrl } = require("./keys");
const cors = require("cors");

const app = express();

require("./models/itemModel");

require("./models/itemCount");

const PORT = 3000;

app.use(bodyParser.json());

app.use(cors());

const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.json());

app.use(authRoutes);

mongoose.connect(mogoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

app.listen(PORT, () => {
  console.log("server running " + PORT);
});
