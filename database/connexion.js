const mangoose = require('mongoose');

let db = null;
const connect = async () => {
    try {
        db = await mangoose.connect('mongodb://localhost:27017/4ESGI');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

module.exports = {connect };