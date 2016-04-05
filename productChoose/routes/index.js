var express = require('express');
var router = express.Router();
var DB = require('../models/db');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});
router.post('/postChoose', function(req, res, next) {
	var name = req.body.name;
	var id = req.body.product_id;
	DB.saveDB(name, id, function(err, docs) {
		if (err) {
			res.send({
				status: 1,
				mes: err
			})
		} else {
			res.send({
				status: 0,
				body: docs
			})
		}
	});
});
router.get('/showChooses', function(req, res, next) {
	res.render('showChooses');
});
router.get('/getChoose', function(req, res, next) {
	var products = DB.get();
	res.send({
		status: 0,
		body: products
	})
});
module.exports = router;