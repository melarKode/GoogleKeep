var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notesSchema = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title:{
        type: String
    },
    body:{
        type: String
    },
    deleted:{
        type: Boolean,
        default:false
    }
},{
    timestamps: true
});

notesSchema.virtual('url')
.get(function(){
    return '/note/'+this._id;
})

var Note = mongoose.model('notes',notesSchema);

module.exports = Note;