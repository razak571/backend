var express = require("express");
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.cookie("age", 25);
  // console.log("req::",req)
  req.session.ban = true;
  res.render("index", { title: "Express" });
});

router.get("/checkban", function (req, res) {
  if (req.session.ban) {
    res.send("you are banned");
  } else {
    res.send("not banned");
  }
  res.send("check kiya hai console deko");
});

router.get("/removeban", function (req, res) {
  req.session.destroy(function (err) {
    if (err) throw err;
    res.send("ban removed");
  });
});

router.get("/read", function (req, res, next) {
  // console.log('reques:', req)
  // res.render("index", { title: "Express" });
  res.send(`age is : ${req.cookies.age}`);
});

router.get("/removecooki", function (req, res, next) {
  // console.log('reques:', req)
  // res.render("index", { title: "Express" });
  res.clearCookie("age");
  res.send("cooki deleted");
});

router.get("/create", async function (req, res, next) {
  const createdUser = await userModel.create({
    username: "Nezuko",
    age: 25,
    name: "Nezuko",
  });
  res.send(createdUser);
});

router.get("/allusers", async function (req, res, next) {
  const allusers = await userModel.find();
  res.send(allusers);
});

router.get("/delete", async function (req, res, next) {
  try {
    let deleteduser = await userModel.deleteMany({
      username: "Nezuko",
    });
    res.send("deleted User::", deleteduser);
    console.log("yes deleted");
  } catch (error) {
    res.send("error happend");
    console.log("error happend while delete");
  }
});

router.get("/update", async function (req, res) {
  const updatedUser = await userModel.updateOne(
    { name: "Hinata" },
    { $set: { name: "Hinta Haruna" } }
  );
  res.send(updatedUser);
});

module.exports = router;
