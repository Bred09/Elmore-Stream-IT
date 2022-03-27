const router = require('express').Router();
// db
const db = require('../db');

let sql = `SELECT * FROM videos`;

router.get('', (req, res) => {
	if (req.session.userLogin) {
		console.log(`Hello, ${req.session.userLogin}. Welcome!`)
		console.log(`ID: ${req.session.id}`)
		console.log(`cookie: ${req.session.cookie}`)
	} else {
		console.log("Not Logged in")
	}
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.render('main', {
			data: result,
			userLogin: req.session.userLogin
		});
	});
});

module.exports = router;