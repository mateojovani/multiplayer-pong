var mongoose = require('mongoose')

//mongo connection
mongoose.connect('mongodb://localhost/multiplayer_pong')

module.exports = mongoose