const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/register',checkNotAuthenticated,(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json({'msg':'Registration Page'});
})

router.post('/register', (req,res,next)=>{
    if(req.body.password!==req.body.password2){
        var err = new Error('Passwords do not match');
        err.status = 401;
        return next(err);
    }else{
        User.register( new User({username: req.body.username}),req.body.password,(err,user)=>{
            if(err){
                return next(err);
            }else{
                user.first_name = req.body.first_name;
                user.last_name = req.body.last_name;
                user.email = req.body.email;
                user.save((err,user)=>{
                    if(err){
                        return next(err);
                    }
                    passport.authenticate('local')(req,res,()=>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(user);
                    });
                });
            };
        });
    };
});

router.get('/login',checkNotAuthenticated,(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json({'msg':'Login Page'});
})

router.post('/login', passport.authenticate('local'),(req,res,next)=>{
    if(req.user){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(req.user);
    }else{
        var err = new Error('Could not Login');
        err.status = 503;
        return next(err);
    }
});

router.get('/logout',checkAuthenticated, (req,res,next)=>{
    req.logout();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({msg:'Logged out successfully'});
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