var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    email:{
        type:String,
        required: true,
        default: ''
    },
    first_name:{
        type: String,
        required: true,
        default:''
    },
    last_name:{
        type: String,
        required: true,
        default:''
    }
},{
    timestamps:true
});

userSchema.virtual('full_name')
.get(function(){
    return this.first_name + ' ' + this.last_name
});

userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('users', userSchema);

module.exports = User;