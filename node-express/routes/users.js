// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

//1. install mongodb (community edition, community server)
//2. install mongoosejs (npm i mongoose)
//3. require and setup connection (mongoose require) (this will create a database)
//4. make schema (this willcreate document in db)
//5. create model and export (this will create collection in db)

//3
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/practicedatabase");

const userschema = mongoose.Schema({
  username: String,
  name: String,
  age: Number,
});

module.exports = mongoose.model("user", userschema);
