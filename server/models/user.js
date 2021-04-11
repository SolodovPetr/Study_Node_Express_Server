const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret = 'superSecret';

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
    },
    token: {
        type: String
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

// Extend userSchema methods and statics

// Compare password
userSchema.methods.comparePassword = function ( candidatePassword, cb ) {
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
        if ( error ) { cb(error); }
        cb( null, isMatch );
    });
}

// Generate token
userSchema.methods.generateToken = function ( cb ) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), secret);

    user.token = token;
    user.save( (error, user) => {
        if ( error ) { return cb( error ); }
        cb( null, user );
    });
}

// Find user by token
userSchema.statics.findByToken = function (token, cb) {
    const User = this;
    jwt.verify(token, secret, (error, decoded) => {
        if (error) { return cb(error) }
        User.findOne({_id: decoded, token}, (error, user) => {
            if (error) { return cb(error) }
            cb( null, user );
        })
    });
}


const User = mongoose.model('User', userSchema);
module.exports = { User };
