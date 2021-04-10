const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

// Hashing password before save to db
userSchema.pre('save', function(next) {
    const user = this;
    if ( user.isModified('password') ) {
        bcrypt.genSalt(saltRounds, (error, salt) => {
            if ( error ) { return next(error); }
            bcrypt.hash(user.password, salt, (error, hash) => {
                if ( error ) { return next(error); }
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});


const User = mongoose.model('User', userSchema);
module.exports = { User };
