'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_cars3'
});

/* GET home page. */
router.get('/:car_id', function (req, res) {
    let query = "SELECT * from t_cars WHERE car_id = " + req.params.car_id + ";"
    db.query(query, function (err, data) {
        if (err) throw err;
        else {
            res.render('car', { data: data });
        }
    });
});

router.post('/:car_id/check', function (req, res) {
    let query = "SELECT * from t_reservations WHERE car_id = " + req.params.car_id + " and ((date_from <= '"
        + req.body.date_from + "' and date_to >= '" + req.body.date_from + "') or (date_from <= '" + req.body.date_to + "' and date_to >= '" + req.body.date_to +"'));"

    db.query(query, function (err, data) {
        if (err) throw err;
        else {
            if (data.length == 0) {
                res.send(true);
            } else {
                res.send(false);
            }
            res.end();
        }
    });
});

router.post('/:car_id/reserve', function (req, res) {
    if (req.session.passport !== undefined && req.session.passport.user !== undefined) {
        let query = "INSERT INTO t_reservations VALUES (null, " + req.session.passport.user.dbUserID + ", " + req.params.car_id + ", '"
            + req.body.date_from + "', '" + req.body.date_to + "');";
        console.log(query);
        db.query(query, function (err, data) {
            if (err) throw err;
            else {
                res.redirect('/');
            }
        });
    }
});

module.exports = router;
