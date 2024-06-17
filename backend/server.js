require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const workoutRoutes = require("./routes/workouts");
const dietRoutes = require("./routes/diets")

//express app
const app = express();

//middleware
app.use(cors())

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
app.use("/api/diets",dietRoutes )

//connect to db
mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    //listen to requests
    app.listen(process.env.PORT, () => {
      console.log(` Connected to DB & listening on port ${process.env.PORT} !!!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
