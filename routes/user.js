const router = require('express').Router();
// db
const db = require('../db');


// User page
router.get('/:login', (req, res, next) => {
	// Session {
	const userId = req.session.userId || false;
	const userLogin = req.session.userLogin || false;
	const userAvatar = req.session.userAvatar || false;
	// }
	const login = req.params.login;

	let sql = `
		SELECT * FROM users WHERE login = ?;
		SELECT * FROM videos WHERE author = ?;
	`;
	db.query(sql, [login, login], (err, result) => {
		if (err) throw err;
		if (!result[0]) {
			// Если USER не найден
			res.json({
				ok: false,
				error: 'User not found!'
			});
		} else {
			res.render('character', {
				user: result[0][0],
				userData: {
					userId,
					userLogin,
					userAvatar
				},
				userVideos: result[1]
			});
		}
	});
});

module.exports = router;