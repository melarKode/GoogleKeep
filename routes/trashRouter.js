const express = require('express');
const router = express.Router();
const Details = require('../models/details');
const Lists = require('../models/lists');
const Notes = require('../models/notes');
const async = require('async');

router.get('/',checkAuthenticated, (req,res,next)=>{
    async.series({
        deleteDetailNote: (callback)=>{
            Details.find({deleteDate:{$ne:null}, type:'note', deleteDate:{$lte: new Date(Date.now() - 10000)}})
            .deleteMany()
            .exec(callback)
        },
        deleteNote: (callback)=>{
            Notes.find({userID:req.user._id, updatedAt:{$lte: new Date(Date.now() - 10000)}, deleted:true})
            .deleteMany()
            .exec(callback)
        },  
        deleteDetailList: (callback)=>{
            Details.find({deleteDate:{$ne:null}, type:'list', deleteDate:{$lte: new Date(Date.now() - 10000)}})
            .deleteMany()
            .exec(callback)
        },
        deleteList: (callback)=>{
            Lists.find({userID:req.user._id, updatedAt:{$lte: new Date(Date.now() - 10000)}, deleted:true})
            .deleteMany()
            .exec(callback)
        },  
        displayNote: (callback)=>{
            Details.find({deleteDate:{$ne:null}, type:'note', deleteDate:{$gte: new Date(Date.now() - 10000)}})
            .populate('noteID')
            .exec(callback)
        },
        displayList: (callback)=>{
            Details.find({deleteDate:{$ne:null}, type:'list', deleteDate:{$gte: new Date(Date.now() - 10000)}})
            .populate('listID')
            .exec(callback)
        }
    },(err,result)=>{
        if(err){
            return next(err);
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(result);
        }
    })
})

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/user/login');
    }
}

module.exports = router;