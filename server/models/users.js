var db = require('./db')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')

const SECRET = 'this_api_is_awesome'

//configure user model
var userSchema = new db.Schema({
    username: String,
    salt: String,
    hash: String
})

userSchema.methods.genPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.hash === hash
}

userSchema.methods.genJWT = function() {
    var expiry = new Date()
    expiry.setDate(expiry.getDate() + 30)
  
    return jwt.sign({
        _id: this._id,
        username: this.username,
        expiresIn: parseInt(expiry.getTime() / 1000)
    }, SECRET) 
}

module.exports = db.model('User', userSchema)