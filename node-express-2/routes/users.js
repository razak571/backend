const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testingdb2"); //db--> testingdb

const userDataSchema = mongoose.Schema({
  username: String,
  password: String, //nickname
  secret: String, //description

  // categories: {
  //   type: Array,
  //   default: [],
  // },
  // datecreated: {
  //   type: Date,
  //   default: Date.now(),
  // },
});

userDataSchema.plugin(plm);

module.exports = mongoose.model("user", userDataSchema);
