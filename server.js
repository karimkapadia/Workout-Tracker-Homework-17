const path = require("path");
const router = require("express").Router();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");

const PORT = process.env.PORT || 3000;
// const router =express.Router();


const app = express();

// app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(router)

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.put("/api/workouts/:id", (req, res) => {
  // console.log(`PUT [/api/workouts/id]`,req.params.id)
  // console.log(`PUT [/api/workouts/id]`,req.body);

  db.workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } })
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", (req, res) => {
  // console.log(`POST [/api/workouts]`, JSON.stringify(req.body));
  db.workout.create(req.body)
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});


app.get("/api/workouts", (req, res) => {
  // console.log(`GET[api/workouts]`, JSON.stringify(req.body));
  db.workout.find({})
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });

});

app.get("/exercise", (req, res) => {
  // console.log(`GET[/exercise]`, JSON.stringify(req.body));
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

// app.get("/stats", (req, res) => {
//   console.log(`GET[/stats]`);
//   res.sendFile(path.join(__dirname, "./public/stats.html"));

// });

app.get("/api/workouts/range", ({ query }, res) => {
  db.workout.find({ day: { $gte: query.start, $lte: query.end } })
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);


});

