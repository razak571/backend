var express = require("express");
var router = express.Router();

const userModel = require("./users");
const passport = require("passport");

//register
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res) {
  res.render("index");
});


//protected route
router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile");
});

router.get("/failed", function (req, res) {
  req.flash("age", 12);
  req.flash("name", "Razak");
  res.send("bangaya");
});

router.get("/checkflash", function (req, res) {
  console.log(req.flash("age"), req.flash("name"));
  res.send("check BE console");
});

// router.get("/create", async function (req, res) {
//   const userData = await userModel.create({
//     username: "Razakkk",
//     nickname: "Razakkk",
//     description: "This is Razakkk's description",
//     categories: ["js", "angular", "Razakk"],
//     // datecreated: Date.now()
//   });
//   res.send(userData);
// });

// router.get("/getusers", async function (req, res) {
//   const allusers = await userModel.find();
//   res.send(allusers);
// });

// 1. case insensitive search
// router.get("/getusers", async function (req, res) {
//   var regex = new RegExp("^razAk$", "i")
//   const allusers = await userModel.find({username: regex});
//   res.send(allusers);
// });

//2 find the document where an Array filed containes all of set of values
// router.get("/getusers", async function (req, res) {
//   const allusers = await userModel.find({
//     categories: { $all: ["js", "angular"] },
//   });
//   res.send(allusers);
// });

// 3. specific date range search in mongoose
// router.get("/getusers", async function (req, res) {
//   var date1 = new Date("2024-06-25"); // yyyy-mm-dd
//   var date2 = new Date("2024-06-26");
//   const allusers = await userModel.find({
//     datecreated: { $gte: date1, $lte: date2 },
//   });
//   res.send(allusers);
// });

// 4. filter documents based on existence of field in Mongoose
// router.get("/getusers", async function (req, res) {
//   const allusers = await userModel.find({
//     categories: { $exists: true },
//   });
//   res.send(allusers);
// });

// 5. filter documents based on  a specific fild's length in mongoose
router.get("/getusers", async function (req, res) {
  const allusers = await userModel.find({
    $expr: {
      $and: [
        { $gte: [{ $strLenCP: "$nickname" }, 0] },
        { $lte: [{ $strLenCP: "$nickname" }, 12] },
      ],
    },
  });
  res.send(allusers);
});

//register route
router.post("/register", function (req, res) {
  console.log("yes")
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });

  // user account and after account loggin
  userModel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

//login code (it is middleware. not reacheing to function)
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

//logout
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//isLoggedIn middleware (for protected route)
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
