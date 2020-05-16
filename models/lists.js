var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    item:{
        type:String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
});

var listSchema = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title:{
        type:String
    },
    todo:[{
        todoSchema
    }]
},{
   timestamps:true 
});

var List = mongoose.model('lists',listSchema);

module.exports = List;
