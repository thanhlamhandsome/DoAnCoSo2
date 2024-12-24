const jwt = require('jsonwebtoken'); 
const User = require('../module/user'); 
const auth = async function (req,res,next){
try{
    const token = req.headers['authorization'].replace('Bearer ', '');
    const decode = jwt.verify(token,'thanhlam'); 
    const user = await User.findOne({_id:decode._id}) ; 
    req.user = user ; 
    req.token = token ; 
    next();
}catch(e){
    res.send({message: "You've not Authorization "})
}
}
module.exports = auth