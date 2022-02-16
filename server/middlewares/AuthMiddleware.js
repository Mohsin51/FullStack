const {verify} = require('jsonwebtoken');

const validToken = (req,res,next)=>{
    const accessToken = req.header("accessToken");
    if(!accessToken){
       return res.json({error: "user not logged in"});
    }
    else{
    try{
        const validateToken = verify(accessToken,"importantsecret");
        req.user = validateToken;
        if(validateToken) {
            return next();
        }
    } catch(err){
        res.json({error: err});
        }
    }
}
module.exports = {validToken}