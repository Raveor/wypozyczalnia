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
router.get('/', function (req, res) {
    if (req.session.passport === undefined || req.session.passport.user === undefined) {
        res.render('reservations', { unauthorized: true });
    } else {    
        let query = "SELECT * from t_reservations a INNER JOIN t_cars b ON a.car_id = b.car_id WHERE a.user_id = " + req.session.passport.user.dbUserID + ";"
        db.query(query, function (err, myData) {
            console.log()
            if (err) throw err;
            else {
                if (req.session.passport.user.admin) {
                    let query = "SELECT * from t_reservations a INNER JOIN t_cars b ON a.car_id = b.car_id WHERE a.user_id != " + req.session.passport.user.dbUserID + ";"
                    db.query(query, function (err, allData) {
                        if (err) throw err;
                        else {
                            res.render('reservations', { unauthorized: false, myData: myData, allData: allData });
                        }
                    }); 
                } else {
                    res.render('reservations', { unauthorized: false, myData: myData });
                }
            }
        });

    }
});

router.get('/:reservation_id/cancel', function (req, res) {
    if (req.session.passport !== undefined || req.session.passport.user !== undefined) {
        let query = "DELETE FROM t_reservations WHERE user_id = " + req.session.passport.user.dbUserID + " and reservation_id = " + req.params.reservation_id + ";"
        db.query(query, function (err, data) {
            if (err) throw err;
            else res.redirect('/reservations');
        });
    }
});

module.exports = router;
