var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_cars'
});

passport.use(new FacebookStrategy({
    clientID: 'nie',
    clientSecret: 'nie',
    callbackURL: 'http://localhost:3000/auth/login/fb/callback'
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, {
        fbUserID: profile.id,
        name: profile.displayName,
        status: 1
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    let query = "SELECT user_id FROM t_users where fb_user_id = " + user.fbUserID;
    console.log(query);
    db.query(query, function (err, data) {
        if (err) throw err;
        else if (data.length == 0) {
            let query = "INSERT INTO t_users VALUES (null, " + user.fbUserID + ", false)";
            db.query(query, function (err, data) {
                if (err) throw err;
                else {
                    let query = "SELECT user_id FROM t_users where fb_user_id = " + user.fbUserID;
                    db.query(query, function (err, data) {
                        if (err) throw err;
                        else {
                            console.log(data);
                            user.dbUserID = data[0].user_id;
                            done(null, user);
                        }
                    });
                }
            });
        } else {
            user.dbUserID = data[0].user_id;
            done(null, user);
        }
    }); 
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