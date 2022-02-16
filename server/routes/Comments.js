const express = require('express');
const { validToken } = require('../middlewares/AuthMiddleware');
const router = express.Router();
const {Comments} = require('../models');

// Data For Single comments
router.get("/:postId", async (req,res)=>{
    const postId=req.params.postId;
    const comments= await Comments.findAll({where :{CreatePostId : postId } });
    res.json(comments); 
});
// Data For Single comments
router.post("/", validToken,async (req,res)=>{
    const comment=req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
});
//For delete comment
router.delete("/:commentId",validToken,async (req,res)=>{
    const commentId = req.params.commentId;
    await Comments.destroy({where :{id: commentId}});
    res.json("Comment DELETED!")
})

module.exports=router;
