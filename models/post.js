const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Post=sequelize.define('post',{
   id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
   },
   postLink:{
    type:Sequelize.STRING,
    allowNull:false
   },
   postDescription:{
    type:Sequelize.STRING,
    allowNull:false
   }
})

module.exports=Post;
