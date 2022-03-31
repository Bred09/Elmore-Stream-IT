const router = require('express').Router();
// db
const db = require('../db');


// User page
router.get('/:login', (req, res, next) => {
	const userId = req.session.userId;
	const userLogin = req.session.userLogin;
	const login = req.params.login;

	console.log(`URL: ${login}`)

	if (!login) {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
		console.log('Error 404!!!');
	} else {
		let sql = `SELECT * FROM characters WHERE login = '${login}'`;
		db.query(sql, (err, result) => {
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
					if (!result[0]) {
						console.log(`Видео юзера ${login} не найдены`);
					} else {
						res.render('character', {
							login,
							user: {
								id: userId,
								login: userLogin
							},
							data: result
						});
					}
				});
			}
		});
	}
});

module.exports = router;