require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const DataModel = require("./model");

app.use(bodyParser.urlencoded({ limit: "100mb", extended: false }));
app.use(bodyParser.json({ limit: "100mb" }));
app.set("port", process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log("server listening at " + process.env.PORT);
});

mongoose
  .connect(`${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(
    () => {
      console.log("Connected to database");
    },
    (err) => {
      console.log(err);
      console.log("Connection Failed");
    }
  );

app.get("/", async (req, res) => {
  return res.json({ message: "working" });
});

app.post("/save_location", async (req, res) => {
  try {
    const data = DataModel({
      device: req.body.device,
      appState: req.body.appState,
      lat: req.body.lat,
      lng: req.body.lng,
      readableTime: new Date(Date.now()).toLocaleString(),
    });
    await data.save();
    res.status(200).json({ message: "saved" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "internal server error" });
  }
});

app.get("/get_location/:device", async (req, res) => {
  try {
    const data = await DataModel.find({ device: req.params.device }).sort(
      "-createdAt"
    );
    res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: "internal server error" });
  }
});
