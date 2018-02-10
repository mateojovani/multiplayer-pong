var express = require('express')
var api = express.Router()

var passport = require('../models/passport')
var User = require('../models/users')

api.get('/', function (req, res, next) {
	res.status(200).json({status:200, data: "API is working correctly"})
})

api.post('/login', function (req, res, next) {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err || user == null) {
            res.status(500).json({status:500, data: "Username not found"})
        } else {
            if (user) {
                if(user.validPassword(req.body.password))
                    res.status(200).json({status:500, data: user.genJWT()})
                else
                    res.status(500).json({status:500, data: "Username/Password is incorrect"})
            } 
        }
    })
})

api.post('/register', function(req, res) {
    var user = new User()
    user.username = req.body.username
    user.genPassword(req.body.password)
    user.save(function(err){
        if(err){
            res.status(500).json({status:500, data: "User Registration Failed"})
        }else{
            res.status(200).json({status:200, data: user.genJWT()})
        }
    })
})


module.exports = api