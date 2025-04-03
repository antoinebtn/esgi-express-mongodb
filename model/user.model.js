const { Schema } = require('mongoose');
const mangoose = require('mongoose');

const user = new Schema({
    email: {
        type: String,
        unique: true,
        validate: function (v){
            return /.+@.+/.test(v)
        }
    },
    password: String
});

const User = mangoose.model('User', user);

module.exports = User;
