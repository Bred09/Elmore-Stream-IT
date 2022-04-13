const router = require('express').Router();
// db
const db = require('../db');


// Create new account page
router.get('/create', (req, res) => {
	const login = req.session.userLogin || false;
	res.render('create-page', {user:login});
});
// Create new
router.post('/create', (req, res) => {
	const login = req.body.login;
	const password = req.body.password;
	const passwordConfirm = req.body.passRepeat;

	if (!login || !password || !passwordConfirm) {
		res.json({
			ok: false,
			error: 'not all fields are filled in!',
			fields: ['login', 'password', 'passwordConfirm']
		});
	} else if (login.length < 3 || login.length > 16) {
		res.json({
			ok: false,
			error: 'login length from 3 to 16 characters!',
			fields: ['login']
		});
	} else if (password !== passwordConfirm) {
		res.json({
			ok: false,
			error: 'passwords don\'t match!',
			fields: ['password', 'passwordConfirm']
		});
	} else if (!/^[a-zA-Z0-9]+$/.test(login)) {
	    res.json({
	      ok: false,
	      error: 'the password can have only Latin characters and numbers without spaces!',
	      fields: ['login']
	    });
	} else if (!/^[a-zA-Z0-9]+$/.test(password)) {
	    res.json({
	      ok: false,
	      error: 'the password can have only Latin characters and numbers without spaces!',
	      fields: ['password']
	    });
	} else if (password.length < 6 || password.length > 20) {
		res.json({
			ok: false,
			error: 'the minimum password length is 6 and the maximum is 20 characters!',
			fields: ['password']
		});
	}
	// Если все правильно то проверяем на дубль
	else {
		let sql = `SELECT * FROM users WHERE login LIKE '${login}'`;
		db.query(sql, (err, result) => {
			if (err) throw err;
			if (!result[0]) {
				// Если все проверки пройдены = СОЗДАЕМ НОВОГО ПЕРСОНАЖА
				let sql = `INSERT INTO users (login, password) VALUES ('${login}', '${password}') `;
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
	const login = req.session.userLogin || false;
	res.render('login-page', {user:login});
});

// Sigin in
router.post('/in', (req, res) => {
	const login = req.body.login;
	const password = req.body.password;

	if (!login || !password) {
		res.json({
			ok: false,
			error: 'not all fields are filled in!',
			fields: ['login', 'password']
		});
	} else if (!/^[a-zA-Z0-9]+$/.test(password)) {
	    res.json({
	      ok: false,
	      error: 'the password can have only Latin characters and numbers without spaces!',
	      fields: ['password']
	    });
	} else {
		let sql = `SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`;
		db.query(sql, (err, result) => {
			if (err) throw err;
			if (!result[0]) {
				// Если юзер не найден
				res.json({
					ok: false,
					error: 'username or password is incorrect',
					fields: ['login', 'password']
				});
			} else {
				// Если юзер найден ВПУСКАЕМ ЕГО
				req.session.userId = result[0]['id'];
				req.session.userLogin = result[0]['login'];
				console.log(`WELCOME ${req.session.userLogin} req.session.userId: ${req.session.userId} sessionID: ${req.session.id}`);
				res.json({
					ok: true
				});
			}
		});
	}
});

//Logout
router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (!err) {
			console.log('Log out!')
			res.redirect('/');
		} else {
			res.redirect('/');
		}
	});
})

// Reset password page
router.get('/reset', (req, res) => {
	const login = req.session.userLogin || false;
	res.render('reset-page', {user:login});
});

module.exports = router;