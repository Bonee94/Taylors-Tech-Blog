const { User, Post } = require("../models");
const withAuth = require('../utils/auth');


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

router.get("/register", async (req, res) => {
  try {
    res.status(200).render("register");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ["password"]},
    })

    const user = userData.get({ plain: true });

    res.status(200).render("dashboard", {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const post = await postData.get({ plain: true});

    req.session.save(() => {
      req.session.viewing_post_id = req.params.id;
    })
    
    res.status(200).render("singlePost", {
      post,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json({ error: err })
  }

})

module.exports = router;
