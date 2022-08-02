const router = require('express').Router();
// db
const db = require('../db');


// User page
router.get('/admin', (req, res) => {
	// Session {
	const userId = req.session.userId || false;
	const userLogin = req.session.userLogin || false;
	const userAvatar = req.session.userAvatar || false;
	// }
	const login = req.params.login;

	let sql = `
		SELECT count (*) as usersCnt FROM users;
		SELECT count (*) as videosCnt FROM videos;
		SELECT count (*) as adminsCnt FROM users WHERE role = 'admin';
	`;
	db.query(sql, (err, result) => {
		console.log(result)
		if (err) throw err;
		if (!result[0]) {
			// Если USER не найден
			res.json({
				ok: false,
				error: 'User not found!'
			});
		} else {
			res.render('dashboard', {
				data: {
					users: result[0][0].usersCnt,
					videos: result[1][0].videosCnt,
					admins: result[2][0].adminsCnt
				},
				userData: {
					userId,
					userLogin,
					userAvatar
				}
			});
		}
	});
});

module.exports = router;