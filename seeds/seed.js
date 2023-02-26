const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const postData = require("./postSeedData.json");
const userData = require("./userSeedData.json");
const commentData = require("./commentSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // postData.forEach(async post => {
  //   await Post.create(post);
  // })

  // commentData.forEach(async comment => {
  //   await Comment.create(comment);
  // })

  await Post.bulkCreate(postData);
  
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
