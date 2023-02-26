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

  await Post.bulkCreate(postData, {
    returning: true,
  });
  
  //await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
