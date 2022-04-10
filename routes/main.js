const router = require('express').Router();
// db
const db = require('../db');

router.get('', (req, res) => {
	const id = req.session.userId;
	const login = req.session.userLogin;
	
	let sql = `SELECT * FROM videos ORDER BY id LIMIT 0, 25`;
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

router.post('/', (req, res) => {
	const quantity = req.body.videos;
	console.log(req.body.videos)

	let sql = `SELECT * FROM videos ORDER BY id LIMIT ${quantity}, 10`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		if (!result[0]) {
			res.json({
				ok: false
			});
		} else {
			res.json({
				ok: true,
				data: result
			});
		}
	});
});

module.exports = router;