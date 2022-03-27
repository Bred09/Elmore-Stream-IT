const router = require('express').Router();
// db
const db = require('../db');


// Upload new video page
router.get('/upload', (req, res) => {
	const id = req.session.userId;
	const login = req.session.userLogin;

	res.render('video/upload', {
		user: {
			id,
			login
		}
	})
})
// Upload new video
router.post('/upload', (req, res) => {
	const poster = req.body.poster;
	const title = req.body.title.trim().replace(/ +(?= )/g, '');

	if (!poster || !title) {
		res.json({
			ok: false,
			error: 'not all fields are filled in!',
			fields: ['title', 'poster']
		});
	} else if (title.length < 1 || title.length > 20) {
		res.json({
			ok: false,
			error: 'title length from 1 to 20 characters!',
			fields: ['title']
		});
	}
	// Если все правильно пропускаем
	else {
		// Если все проверки пройдены = ЗАГРУЖАЕМ НОВОЕ ВИДЕО
		let sql = `INSERT INTO videos (poster, title, author) VALUES ('${poster}', '${title}', '${req.session.userLogin}')`;
		db.query(sql, (err, result) => {
			if (err) throw err;
			if (result) {
				console.log(result);
				res.json({
					ok: true
				});
			}
		});
	}
	console.log(req.body);
})

// Vide page
router.get('/:video', (req, res, next) => {
	const userId = req.session.userId;
	const userLogin = req.session.userLogin;
	const url = req.params.video;
	console.log(`URL: ${url}`)
	if (!url) {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
		console.log('Error 404!!!');
	} else {
		let sql = `SELECT * FROM videos WHERE id = '${url}'`;
		db.query(sql, (err, result) => {
			if (err) throw err;
			if (!result[0]) {
				// Если видео не найден
				res.json({
					ok: false,
					error: 'Video not found!'
				});
				console.log(`Video not found. Result: ${result}`)
				console.log('Video not found!')
			} else {
				const video = result[0];
				console.log(video)
				// Если видео найдено ПОКАЗЫВАЕМ
				res.render('video/play', {
					video,
					user: {
						id: userId,
						login: userLogin
					}
				});
				console.log(`Video ${url} found!`);
			}
		});
	}
})

module.exports = router;