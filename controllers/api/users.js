const router = require("express").Router();
const { Post, User } = require("../../models");

router.post("/register", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    });

    res.status(200).render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
