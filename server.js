const  router  = require("express").Router();
const express = require("express");
 const logger = require("morgan");
const mongoose = require("mongoose");
const  db  = require("./models");

const PORT = process.env.PORT || 3000;
// const router =express.Router();


const app = express();

// app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(router)

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.put("/api/workouts/", (req, res) => {
  console.log(`put [/api/workouts]`,JSON.stringify(req.body));
  
  // db.workout.create(body)
  // db.Book.create(body)
    // .then(({_id}))  db.workout.findOneAndUpdate
  //   .then(({_id}) => db.Library.findOneAndUpdate({}, { $push: { books: _id } }, { new: true }))
  //   .then(dbLibrary => {
  //     res.json(dbLibrary);
  //   })
  //   .catch(err => {
  //     res.json(err);
    });


app.put("/api/workouts/:id", (req, res)=>{
  console.log(`PUT [/api/workouts/id]`,req.params.id)
  console.log(`PUT [/api/workouts/id]`,req.body);
 
  db.workout.updateOne({_id:req.params.id},{$push:{exercises:req.body}})      
      .then(dbworkout => {
            res.json(dbworkout);
          })
          .catch(err => {
            res.json(err);
          });      

   
    });

  app.post("/api/workouts",(req, res)=>{
      console.log(`POST [/api/workouts]`,JSON.stringify(req.body));
      db.workout.create(req.body)      
      .then(dbworkout => {
            res.json(dbworkout);
          })
          .catch(err => {
            res.json(err);
          });      

      
       });
  

    app.get("/api/workouts", (req, res)=> {
      console.log(`GET[api/workouts]`,JSON.stringify(req.body));
      db.workout.find({})      
      .then(dbworkout => {
            res.json(dbworkout);
          })
          .catch(err => {
            res.json(err);
          });      
      
        
      });

      app.get("/api/workouts/range", (req, res)=> {
        console.log(`GET[api/workouts]`,JSON.stringify(req.body));
        db.workout.find({})      
        .then(dbworkout => {
              res.json(dbworkout);
            })
            .catch(err => {
              res.json(err);
            });      
        
          
        });
      
    






app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);


});

