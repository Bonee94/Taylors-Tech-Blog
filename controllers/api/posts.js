const router = require("express").Router();
const { Comment, Post, User } = require("../../models");

//saves new post to db
router.post("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);

    const post = {
        author: user.username,
        title: req.body.title,
        content: req.body.content,
        date_created: Date.now(),
        user_id: req.session.user_id,
    }

    await Post.create(post);

    res.status(200).json('Post Saved')
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
