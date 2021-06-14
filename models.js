const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    //id can be autamatic, no need to include
    name: {
        type: String,
        require: true
    }, //every student must have a name
    courses: [{
        name: String,
        dateTaken: Date
    }], //array of this object 
    gpa: Number,
    somethingElse: Map // can store arbitury objects here

});


module.exports = {
    studModel: mongoose.model('Student', studentSchema),
};