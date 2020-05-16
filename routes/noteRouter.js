const express = require('express');
const router = express.Router();
const Details = require('../models/details');
const Notes = require('../models/notes');

router.get('/',checkAuthenticated,(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({'msg':'Notes page'});
})

router.post('/',checkAuthenticated, (req,res,next)=>{
    var note = new Notes({
        title: req.body.title,
        body: req.body.body,
        userID: req.user._id
    });
    note.save((err, note)=>{
        if(err){
            return next(err);
        }else{
            var detail = new Details({
                userID: req.user._id,
                type: 'note',
                noteID: note._id,
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
                        notes: note,
                        details: details
                    }
                    res.json(json);
                }
            })
        }
    })
});

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/user/login');
    }
}

module.exports= router;