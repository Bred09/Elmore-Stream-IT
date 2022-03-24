const router = require('express').Router();
// db
const db = require('../db');
var stylePathCharacter = "character";

let sql = `SELECT * FROM videos`;
router.get('/gumball123', (req, res) => {
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		
		res.render('character', {
			data: result,
			wrapper: stylePathCharacter
		});
	});
	
});

module.exports = router;