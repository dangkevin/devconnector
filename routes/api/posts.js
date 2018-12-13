const express = require("express");

const router = express.Router();
/*Public route */
router.get("/test", (req, res) => res.json({ msg: "Post works" }));

module.exports = router;
