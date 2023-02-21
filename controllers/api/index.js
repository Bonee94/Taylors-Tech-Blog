const router = require("express").Router();

const users = require("./users");
const comments = require("./comments");
const posts = require("./posts");

router.use("/users", users);
router.use("/posts", posts);
router.use("/comments", comments);

module.exports = router;
