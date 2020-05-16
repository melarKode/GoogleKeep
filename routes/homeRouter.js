var express = require('express');
const router = express.Router();
var async = require('async');

var Details = require('../models/details');

router.get('/',checkAuthenticated, (req,res,next)=>{
    async.parallel({
        notes: (callback)=>{
            Details.find({type:'note', deleteDate:null, archived:"false"})
            .populate('noteID')
            .exec(callback)
        },
        list: (callback)=>{
            Details.find({type:'list', deleteDate:null, archived:"false"})
            .populate('listID')
            .exec(callback)
        },
        draw: (callback)=>{
            Details.find({type:'draw', deleteDate:null, archived:"false"})
            .populate('drawID')
            .exec(callback)
        },
        photo: (callback)=>{
            Details.find({type:'draw', deleteDate:null, archived:"false"})
            .populate('photoID')
            .exec(callback)
        }
    },(err,data)=>{
        if(err){
            return next(err);
        }
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

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