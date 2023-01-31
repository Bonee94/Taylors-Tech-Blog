const sequelize = require('../config/connection');
const {Post} = require('../models');

const postData = require('./postSeedData.json')

console.log(postData)

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await Post.bulkCreate(postData);
  
    process.exit(0);
  };
  
seedDatabase();