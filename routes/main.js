const router = require('express').Router();
// db
const db = require('../db');

let sql = `SELECT * FROM videos`;

router.get('', (req, res) => {
	const id = req.session.userId;
	const login = req.session.userLogin;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.render('main', {
			data: result,
			user: {
				id,
				login
			}
		});
	});
});

module.exports = router;