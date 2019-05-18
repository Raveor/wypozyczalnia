'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_cars'
});

/* GET home page. */
router.get('/', function (req, res) {
    let query = "SELECT * from t_cars;"
    db.query(query, function (err, data) {
        if (err) throw err;
        else {
            console.log(req.session);
            res.render('index', { title: 'Express', data: data });
        }
    });
});

module.exports = router;
