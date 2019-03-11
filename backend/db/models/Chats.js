const mongoose = require('mongoose');
const connection = require('../connection');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    userOne: {
        type: String
    },
    userTwo: {
        type: String
    },
    chat: [
        {
            from: String,
            to: String,
            message: String
        }
    ]
});

const Chat = mongoose.model('chat', chatSchema);
module.exports =  Chat;