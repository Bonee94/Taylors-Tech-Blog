const { Comment, User, Post } = require("../models");
const withAuth = require("../utils/auth");
const dateFormatter = require("../utils/dateFormat");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    // //format milliseconds to locale date and time
    // for (const post of posts) {
    //   post.date_created = dateFormatter(post.date_created);
    // }

    posts.reverse();

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

//user dashboard after being signed in
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post, as: "posts" }],
    });

    const user = userData.get({ plain: true });

    const pageTitle = "Your Dashboard";

    // //format milliseconds to locale date and time
    // for (const post of user.posts) {
    //   post.date_created = dateFormatter(post.date_created);
    // }

    user.posts.reverse();

    res.status(200).render("dashboard", {
      user,
      pageTitle,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//route to render new post creation
router.get("/dashboard/new-post", withAuth, async (req, res) => {
  try {
    const pageTitle = "Your Dashboard";

    res.status(200).render("dashboardNewPost", {
      pageTitle,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//route to render single post for updating a users post
router.get("/dashboard/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment, as: "comments" }],
    });

    const post = await postData.get({ plain: true });

    //sort comments into descending order (newest first)
    post.comments.reverse();

    // //format milliseconds to locale date and time
    // post.date_created = dateFormatter(post.date_created);

    // for (const comment of post.comments) {
    //   comment.date_created = dateFormatter(comment.date_created);
    // }

    req.session.save(() => {
      req.session.viewing_post_id = req.params.id;

      res.status(200).render("dashboardSinglePost", {
        post,
        logged_in: true,
      });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//brings up commenting page for a single post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment, as: "comments" }],
    });

    const post = await postData.get({ plain: true });

    //sort comments into descending order (newest first)
    post.comments.reverse();

    // //format milliseconds to locale date and time
    // post.date_created = dateFormatter(post.date_created);

    // for (const comment of post.comments) {
    //   comment.date_created = dateFormatter(comment.date_created);
    // }

    req.session.save(() => {
      req.session.viewing_post_id = req.params.id;

      res.status(200).render("singlePost", {
        post,
        logged_in: req.session.logged_in,
      });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
