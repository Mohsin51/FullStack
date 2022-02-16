const express = require('express');
const { validToken } = require('../middlewares/AuthMiddleware');
const router = express.Router();
const {Likes} = require('../models');

router.post("/", validToken, async (req,res)=>{
    const {CreatePostId} = req.body;
    const userId = req.user.id;
    const found = await Likes.findOne({where: {RegisterId: userId,CreatePostId: CreatePostId}});
    if(!found){
    await Likes.create({RegisterId: userId,CreatePostId: CreatePostId});
    res.json({liked: true});
    } else{
        await Likes.destroy({where: {RegisterId: userId,CreatePostId: CreatePostId}});
    res.json({liked: false})

    }
})
module.exports=router;
