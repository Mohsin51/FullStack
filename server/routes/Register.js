const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Register} = require('../models');
const {CreatePost,Likes} = require('../models');
const {sign} = require('jsonwebtoken');
const {validToken} = require('../middlewares/AuthMiddleware')

//For get all users
router.get("/", async (req,res)=>{
    const listOfUsers= await Register.findAll();
    res.json(listOfUsers);
});

// Data For Single User
router.get("/singleuser/byId/:id", async (req,res)=>{
    const id=req.params.id;
    const user= await Register.findByPk(id);
    res.json(user); 
});  
// for registration
router.post("/", async (req,res)=>{
    const {fname,lname,gender,email,password,address}=req.body;
    const emailCheck = await Register.findOne({where :{email: email}});
    if(emailCheck){
        res.json({message: "SORRY USER ALREADY IS IN USE"});
    } else{
        bcrypt.hash(password,10).then((hash)=>{
            Register.create({
                fname: fname,
                lname: lname,
                gender: gender,
                email: email,
                password: hash,
                address: address,
            });
        });
        res.json({message: "HURRAY YOU REGISTERED SUCCESSFULLY"});
    }
});
// for login
router.post("/login", async (req,res)=>{
    const {username,  password}= req.body;
    const user=await Register.findOne({where :{fname: username}});
    if(!user){
        return res.send({error: "User Does Not Exist !"})
    }
    bcrypt.compare(password,user.password).then((match)=>{
        if(!match){
            return res.send({error: "Wrong user/password combination"});
        } else{
            // 1) Generate accessToken and response back to front end 
            const accessToken = sign({username: user.fname, id: user.id},"importantsecret");
                res.json({token: accessToken,username: username,id: user.id});
        }
    });
});
// For profile
router.get("/profile/:id",async (req,res)=>{
    const id=req.params.id;
    const basicInfo = await Register.findByPk(id,{attributes: {exclude:["password"]}});
    res.json(basicInfo);

})

// For malicious user accesstoken
router.get("/auth",validToken,(req,res)=>{
 res.json(req.user);
});
// for create post
router.post("/createpost",validToken, async (req,res)=>{
    const post=req.body;
    post.user = req.user.username;
    // post.id = req.user.id 
    await CreatePost.create(post);
    res.json(post);
}); 
//for all psots
router.get("/allposts",validToken, async (req,res)=>{
    const listOfPosts= await CreatePost.findAll({include: [Likes] });
    const likedPosts = await Likes.findAll({where: {RegisterId: req.user.id}});
    res.json({listOfPosts: listOfPosts,likedPosts: likedPosts});
});
// Data For Single Post
router.get("/singlepost/byId/:id", async (req,res)=>{
    const id=req.params.id;
    const singlepost= await CreatePost.findByPk(id);
    res.json(singlepost); 
}); 
// For edit post
router.put("/edittitle",async (req,res)=>{
    const {newTitle,id} = req.body;
    await CreatePost.update({title: newTitle},{where: {id: id}});
    res.json(newTitle)
});
router.put("/edittext",async (req,res)=>{
    const {newText,id} = req.body;
    await CreatePost.update({body: newText},{where: {id: id}});
    res.json(newText)
})
//For display list of post of user
// router.get("/byuserId/:id",async (req,res)=>{
//     const id = req.params.id;
//     const post = await CreatePost.findAll(id)
// })

// For delete post
router.delete("/:postId",validToken, async(req,res)=>{
    const postId = req.params.postId;
    await CreatePost.destroy({where:{id: postId}});
    res.json("Post Deleted ");
} )
// For profile Page
router.get("/profile/:id",validToken, async(req,res)=>{
    const id = req.params.postId;
    console.log("we are here");
    console.log(id);
    console.log("a the end");
});

module.exports=router;