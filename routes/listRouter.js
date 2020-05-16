const express = require('express');
const router = express.Router();
Details = require('../models/details');

router.get('/',checkAuthenticated, (req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({'msg':'List page'});
})

router.post('/',checkAuthenticated, (req,res,next)=>{
    
})

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/user/login');
    }
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }else{
        next();
    }
}

module.exports = router;