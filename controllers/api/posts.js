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

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.session.viewing_post_id)

    const post = await postData.get({ plain: true });

    console.log(post)

    res.status(200).json(post)
  } catch (error) {
    res.status(400).json(error);

  }
});

//updates post in db
router.put("/", async (req, res) => {
  try {

    const post = {
        title: req.body.title,
        content: req.body.content,
    }

    await Post.update(post, {
      where: {id: req.session.viewing_post_id}
    });

    res.status(200).json('Post Updated')
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
