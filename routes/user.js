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

	if (!login) {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
		console.log('Error 404!!!');
	} else {
		let sql = `SELECT * FROM users WHERE login = '${login}'`;
		db.query(sql, (err, result) => {
			user = result[0];
			if (err) throw err;
			if (!result[0]) {
				// Если видео не найден
				res.json({
					ok: false,
					error: 'User not found!'
				});
				console.log(`User not found. Result: ${result}`)
				console.log('User not found!')
			} else {
				let sql = `SELECT * FROM videos WHERE author = '${login}'`;
				db.query(sql, (err, result) => {
					if (err) throw err;
					if (result) {
						if (!result[0]) {console.log(`Видео юзера ${login} не найдены`);}
						res.render('character', {
							user,
							userData: {
								userId,
								userLogin,
								userAvatar
							},
							userVideos: result
						});
					}
				});
			}
		});
	}
});

module.exports = router;