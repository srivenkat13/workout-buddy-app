require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const dietRoutes = require("./routes/diets");
const userRoutes = require("./routes/user");
// const Workout = require("./models/workoutModel");

//express app
const app = express();

//middleware
app.use(cors());

app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// routes
// app.get('/', (req,res)=> {
//   res.json({msg: 'Welcome back to my youtube channel'})
// })
app.use("/api/workouts/", workoutRoutes);
app.use("/api/diets", dietRoutes);
app.use("/api/users", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  //   Mass Update Workout documents
  // .then(() => {
  //   console.log("Connected to MongoDB");

  //   return Workout.updateMany(
  //     { user_id: { $exists: false } },
  //     { $set: { user_id: "66864d2f968d79252ec46859" } }
  //   );
  // })
  .then(() => {
    //listen to requests
    app.listen(process.env.PORT, () => {
      console.log(
        ` Connected to DB & listening on port ${process.env.PORT} !!!`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
