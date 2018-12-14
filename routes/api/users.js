const express = require("express");

/* Creates a router as a module, loads a middleware 
    function in it, defines some routes, and mounts the
     router module on a path in the main app. */

const router = express.Router();

//Load User Model
const User = require("../../models/User");
//@route GET api/users/test
//@desc Test
//@access Public

router.get("/test", (req, res) => res.json({ msg: "User works" }));

//@route GET api/users/register
//@desc Register user
//@access Public

router.post("/register", (req, res) => {
  /*req.body.email will allow you to get the email from the
    post request*/
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
    }
  });
});

module.exports = router;
