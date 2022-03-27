const router = require('express').Router();
// db
const db = require('../db');

let sql = `SELECT * FROM videos`;
router.get('/beka', (req, res) => {
	var userData = req.session;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.render('character', {
			data: result,
			userData: userData
		});
	});
	
});

module.exports = router;