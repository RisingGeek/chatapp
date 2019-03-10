var express = require('express');
var router = express.Router();
const User = require('../db/models/Users');

/* GET home page. */
router.post('/adduser', function(req, res, next) {
  User.findOne({username: req.query.username})
  .then(currentUser => {
    if(currentUser) {
      console.log('current user');
      res.json({response:'already a user'});
    }
    else {
      new User(req.query).save().then(newUser => {
        console.log('new user',newUser);
        res.json({response:'new user added'});
      });
    }
  })
});

router.get('/getusers', (req,res) => {
  User.find({})
  .then(response => {
    //console.log(response);
    res.send({ users: response });
  })
})

module.exports = router;
