'use strict';

const bcrypt = require('bcryptjs');

const User = require('./user');

module.exports = function(name, email, passwordHash) {
    const Model = this;
    return Model.findByEmail(email)
        .then(user => {
        if (user) {
            // throw new Error('User_already_exits');
            throw new Error('USER_ALREADY_EXISTS');
        } else {
            return bcrypt.hash(passwordHash, 10);
        }   
        })
    // return bcrypt.hash(passwordHash, 10)
        .then(hash => {
           return Model.create({
                name, 
                email,
                passwordHash: hash
            });
        })
        .then(user => {
            return Promise.resolve(user);
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(new Error('There was an error in the sign up process.'));
        });
};
