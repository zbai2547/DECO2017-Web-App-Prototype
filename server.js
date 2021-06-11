const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api/listMusic", async (req, res) => {
  const musicList = await MusicModel.find();
  res.json({
    musicList,
  });
});

//http://localhost:3000/users

mongoose.connect("mongodb://localhost:27017/0531", function (err) {
  if (err) {
    console.log("Not connected to the database:" + err);
  } else {
    console.log("Successfully connected to MongoDB");
    initMusic();
  }
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/static/index.html"));
});

app.listen(port, function () {
  console.log("listening on port" + port);
});

const Schema = mongoose.Schema;
const MusicSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { versionKey: false }
);
const MusicModel = mongoose.model("Music", MusicSchema);

async function initMusic() {
  const foundMusic = await MusicModel.find({
    name: "Against the Current - Legends Never Die",
  });
  if (foundMusic.length) {
    return;
  }

  const music1 = new MusicModel();
  music1.name = "Against the Current - Legends Never Die";
  music1.url = "/media/Against the Current - Legends Never Die.mp3";
  await music1.save();

  const music2 = new MusicModel();
  music2.name = "Reynard Silva - The Way I Still Love You";
  music2.url = "/media/Reynard Silva - The Way I Still Love You.mp3";
  await music2.save();

  const music3 = new MusicModel();
  music3.name = "CMJ - 所念皆星河";
  music3.url = "/media/CMJ - 所念皆星河.mp3";
  await music3.save();
}
