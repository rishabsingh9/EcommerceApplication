const Post=require('../models/post');
const Comment=require('../models/comments');
const { where } = require('sequelize');

exports.createPost=async (req,res,next)=>{
    try{
       const postLink=req.body.postLink;
       const postDescription=req.body.postDescription;
       console.log(postDescription);
       
       const data=await Post.create({
        postLink:postLink,
        postDescription:postDescription
       })
       res.status(201).json({newPost:data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        }) 
    }
}

exports.getPosts= async(req,res,next)=>{
    try{
        const data=await Post.findAll();
        res.status(200).json({newPost:data});
      }
      catch(err){
          res.status(500).json({
              error:err
          })  
      }
}

exports.addComment=async(req,res,next)=>{
    try{
        const postId=req.body.postId;
        const comment=req.body.text;
     const data=Comment.create({
       comment:comment,
       postId:postId
     })
     res.status(201).json({newComment:data});
    }
    catch(err){
        res.status(500).json({
            error:err
        }) 
    }
}

exports.getComments=async (req,res,next)=>{
    const postId=req.params.postId;
    console.log(postId);
    try{
        const data =await Comment.findAll({where:{postId:postId}});
        console.log(data);
        res.status(200).json({newComment:data});
    }
    catch(err){
        res.status(500).json({
            error:err
        }) 
    }
}