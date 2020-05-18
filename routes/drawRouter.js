const express = require('express');
const router = express.Router();
const { createCanvas, loadImage } = require('canvas');

router.get('/',checkAuthenticated,(req,res,next)=>{
    const canvas = createCanvas(200,200);
    const ctx = canvas.getContext('2d');

    ctx.font = '30px Impact'
    ctx.rotate(0.1)
    ctx.fillText('Awesome!', 50, 100)

    res.send({canvas: ctx});
})

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/user/login');
}

module.exports = router;