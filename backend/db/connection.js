const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true}, () => {
    console.log('connected to databse');
})