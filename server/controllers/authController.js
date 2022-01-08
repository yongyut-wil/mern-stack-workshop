const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')


exports.login=(req,res)=>{
    const {username, password} = req.body
    if(password === process.env.PASSWORD){
        //logib เข้าสู่ระบบ
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})

    }else{
        return res.status(400).json({error:"รหัสผ่านไม่ถูกต้อง"})}
    
}

exports.requireLogin=expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty:"auth"
})