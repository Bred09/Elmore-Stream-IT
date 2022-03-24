const router = require('express').Router();
// db
const db = require('../db');

let sql = `SELECT * FROM videos`;
router.get('/video', (req, res) => {
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		
		res.render('play-page', {
			data: result
		});
	});
	
});

module.exports = router;