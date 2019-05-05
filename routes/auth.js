var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '2266706556916608',
    clientSecret: '055db9672ca87036487916ef5d950533',
    callbackURL: 'http://localhost:3000/auth/login/fb/callback'
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, {
        user: profile.id,
        name: profile.displayName,
        status: 1
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

/* GET home page. */
router.get('/login/fb',
    passport.authenticate('facebook'));


router.get('/login/fb/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
    })
);


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;