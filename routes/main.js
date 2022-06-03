const router = require('express').Router();
// db
const db = require('../db');

router.get('', (req, res) => {
// Session {
	const userId = req.session.userId || false;
	const userLogin = req.session.userLogin || false;
	const userAvatar = req.session.userAvatar || false;
// }
	console.log(userId)
	console.log(userLogin)
	console.log(userAvatar)
	let sql = `SELECT * FROM videos ORDER BY id LIMIT 0, 25`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.render('main', {
			data: result,
			userData: {
				userId,
				userLogin,
				userAvatar
			}
		});
	});
});

router.post('/', (req, res) => {
	const quantity = req.body.videos;
	console.log(req.body.videos)

	let sql = `SELECT * FROM videos ORDER BY id LIMIT ?, 10`;
	db.query(sql, [quantity], (err, result) => {
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