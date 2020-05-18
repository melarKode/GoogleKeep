const express = require('express');
const router = express.Router();
const Details = require('../models/details');
const List = require('../models/lists');

router.get('/',checkAuthenticated, (req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({'msg':'List page'});
})

router.post('/',checkAuthenticated, (req,res,next)=>{
    var incomplete = req.body.incomplete;
    var complete = req.body.complete;
    var title = req.body.title;
    var item1 = [];
    for(const item of incomplete){
        item1.push({
            item: item, 
            completed: false
        });
    };
    for(const item of complete){
        item1.push({
            item: item,
            completed: true
        });
    };
    var list = new List({
        userID: req.user._id,
        title: title,
        todo: item1
    });
    list.save((err,list)=>{
        if(err){
            return next(err);
        }else{
            var detail = new Details({
                userID: req.user._id,
                type: 'list',
                listID: list._id,
                archived: false,
                pinned: false
            });
            detail.save((err,details)=>{
                if(err){
                    return next(err);
                }else{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    var json = {
                        lists: list,
                        details: details
                    }
                    res.json(json);
                }
            })
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

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }else{
        next();
    }
}

module.exports = router;