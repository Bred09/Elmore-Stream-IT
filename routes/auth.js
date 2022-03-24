const router = require('express').Router();
// db
const db = require('../db');
var data = "udali potom"

// Create new account page
router.get('/create', (req, res) => {
	res.render('create-page', {
		data: data
	});
});
// Create new
router.post('/create', (req, res) => {
	const login = req.body.login;
	const password = req.body.password;
	const passwordConfirm = req.body.passRepeat;

	if (!login || !password || !passwordConfirm) {
		res.json({
			ok: false,
			error: 'Not all fields are filled in!',
			fields: ['login', 'password', 'passwordConfirm']
		});
	} else if (login.length < 3 || login.length > 16) {
		res.json({
			ok: false,
			error: 'Login length from 3 to 16 characters!',
			fields: ['login']
		});
	} else if (password !== passwordConfirm) {
		res.json({
			ok: false,
			error: 'Passwords don\'t match!',
			fields: ['password', 'passwordConfirm']
		});
	}

	// Если все правильно то проверяем на дубль
	else {
		let sql = `SELECT * FROM characters WHERE login LIKE '${login}'`;
		db.query(sql, (err, result) => {
			if (err) throw err;
			if (!result[0]) {
				// Если все проверки пройдены = СОЗДАЕМ НОВОГО ПЕРСОНАЖА
				let sql = `INSERT INTO characters (id, login, password, videos) VALUES (NULL, '${login}', '${password}', 'video.mp4') `;
				db.query(sql, (err, result) => {
					if (err) throw err;
					if (result) {
						console.log(result);
						res.json({
							ok: true
						});
					}
				});
			} else {
				// Если result не пуст выводим ошибку
				res.json({
					ok: false,
					error: 'Login is busy',
					fields: ['login']
				});
			}
		});
	}
});

// Login page
router.get('/login', (req, res) => {
	res.render('login-page', {
		data: data
	});
});

// Reset password page
router.get('/reset', (req, res) => {
	res.render('reset-page', {
		data: data
	});
});

module.exports = router;