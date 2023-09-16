const Post=require('../models/post');

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