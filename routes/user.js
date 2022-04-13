const router = require('express').Router();
// db
const db = require('../db');


// User page
router.get('/:login', (req, res, next) => {
	const id = req.session.userId;
	const login = req.session.userLogin;
	const userLogin = req.params.login;

	console.log(`URL: ${userLogin}`)

	if (!userLogin) {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
		console.log('Error 404!!!');
	} else {
		let sql = `SELECT * FROM users WHERE login = '${userLogin}'`;
		db.query(sql, (err, result) => {
			userData = result[0];
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
				let sql = `SELECT * FROM videos WHERE author = '${userLogin}'`;
				db.query(sql, (err, result) => {
					if (err) throw err;
					if (result) {
						if (!result[0]) {console.log(`Видео юзера ${userLogin} не найдены`);}
						res.render('character', {
							userData,
							user: {
								id,
								login
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