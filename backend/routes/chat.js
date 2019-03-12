const express = require('express');
const router = express.Router();
const Chat = require('../db/models/Chats');

router.post('/addchat', (req,res) => {
    //console.log('add chat route');
    let from = req.query.from;
    let to = req.query.to;
    Chat.findOne({
        $or: [
            { $and: [{userOne: from}, {userTwo: to}] }, 
            { $and: [{userOne: to, userTwo: from}] }
        ]
    })
    .then(docs => {
        console.log(docs);
        if(!docs) {
            new Chat({ 
                userOne: from,
                userTwo: to,
                chat: [{
                    from: from,
                    to: to,
                    message: req.query.message
                }]
            }).save().then(newUserChat=> {
                console.log('new user chat', newUserChat);
                res.send('new user chat');
            })
        }
        else {
            Chat.update({
                $or: [
                    { $and: [{userOne: from}, {userTwo: to}] }, 
                    { $and: [{userOne: to, userTwo: from}] }
                ]
            },
            { $push: { chat: req.query }}
            )
            .then(chat => {
                console.log('chat added',chat);
                res.send('new chat');
            })
        }
    })
})

router.get('/getchats', (req,res) => {
    console.log(req.query)
    let from = req.query.from;
    let to = req.query.to;
    if(from && to) {
        Chat.findOne({
            $or: [
                { $and: [{userOne: from}, {userTwo: to}] }, 
                { $and: [{userOne: to, userTwo: from}] }
            ]
        }).then(result => {
            if(result) {
                res.send({ chats: result.chat });
            }
        }).catch(err => {
            console.log('error',err)
        })
    }
    else {
        res.send({ chats: [] });
    }
})

module.exports = router;