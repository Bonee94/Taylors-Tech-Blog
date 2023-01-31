const { response } = require("../../Taylors-Note-Taker/db");
const { Post } = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    res.status(200).render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err); 
  }
});

router.get("/login", async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
