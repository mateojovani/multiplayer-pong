var User = require('./users')

var passport = require('passport'), 
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt

//passport-jwt
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader('authorization')
opts.secretOrKey = 'this_api_is_awesome'

passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
    User.findOne({id: jwtPayload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}))

module.exports = passport