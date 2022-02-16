const express = require('express');
const cors = require ('cors');
const app =express();
const db=require("./models");
app.use(cors());
app.use(express.json());

const router= require('./routes/Register');
app.use("/post",router);

const commentsRouter= require('./routes/Comments');
app.use("/comments",commentsRouter);

const likesRouter= require('./routes/Likes');
app.use("/likes",likesRouter);

db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("server is running on port 3001");
    });
})


