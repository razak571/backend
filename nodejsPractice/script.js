// let a = 100;

// // console.log(a);

// module.exports = a;

// var oneLinerJoke = require('one-liner-joke');
// var getRandomJoke = oneLinerJoke.getRandomJoke();
// console.log(getRandomJoke)

// module.exports = getRandomJoke
// module.exports = getRandomJoke;

// var figlet = require("figlet");

// figlet("Hello World!!", function (err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });

// let express = require("express");
// let app = express();

// app.use(function (req, res, next) {
//   console.log("hello from middleware");
//   console.log("req::", req);
//   next();
// });

// app.use(function (req, res, next) {
//   console.log("hello from middleware 2");
//   next();
// });

// app.set("view engine", "ejs");

// app.get("/", function (req, res) {
//   res.render("index");
// });

// app.get("/profile/:userName", function (req, res) {
//   console.log("req:::", req);
//   res.send(`this is your profile details:: ${req.params.userName}`);
// });

// app.get("/profile/:userName", function (req, res) {
//   console.log("req:::", req);
//   res.render("profile", { name: "razak", userName: req.params.userName });
// });
// app.listen(3000);
