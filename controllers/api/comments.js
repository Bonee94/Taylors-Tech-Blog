const router = require("express").Router();
const { Comment, Post, User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);

    const comment = {
        author: user.username,
        content: req.body.comment,
        date_created: req.body.date,
        user_id: req.session.user_id,
        post_id: req.session.viewing_post_id
    };

    const commentData = await Comment.create(comment);

    res.status(200).json("Comment Saved");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
