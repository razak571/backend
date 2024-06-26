// let data = require("./script");

// console.log(data)

// let hue = require('./script')
// console.log(hue)

const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("./public"));

app.get("/", function (req, res, next) {
  console.log("inside root route");
  res.send("lets see");
});

app.get("/contact/:dynamic", function (req, res, next) {
  console.log("inside contact route");
  res.render("contact", { name: "Razak", dynamic: req.params.dynamic });
});

app.get("/myprofile", function (req, res, next) {
  console.log("inside profile route");
  res.render("myprofile");
});

app.get("/error", function (req, res, next) {
  console.log("inside error route");
  // res.render("error");
  throw Error("Some Error Ree Baba");
});

app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

app.listen(4000);
