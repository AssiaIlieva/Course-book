const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 5,
        required: true, 
    },
    type: {
        type: String,
        minLength: 3,
        required: true,
    },
    certificate: {
        type: String,
        minLength: 2,
        required: true,
    },
    image: {
        type: String,
        match: /^https?:\/\//,
        required: true,
    },
    description: {
        type: String,
        minLength: 10,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    createdAt: Date,
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});

courseSchema.pre('save', function(){
    if(!this.createdAt){
        this.createdAt = Date.now();
    }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

