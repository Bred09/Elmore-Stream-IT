const router = require('express').Router();
const multer = require('multer');
const path = require('path');
// db
const db = require('../db');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
});
const upload = multer({
	storage,
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		if (ext !== '.mp4' && ext !== '.avi') {
			const err = new Error('Extention');
			err.code = 'EXTENTION';
			return cb(err);
		}
		cb(null, true);
	}
}).single('file');


// Upload new video page
router.get('/upload', (req, res) => {
	// Session {
	const userId = req.session.userId || false;
	const userLogin = req.session.userLogin || false;
	const userAvatar = req.session.userAvatar || false;
	// }

	res.render('video/upload', {
		user: {
			id,
			userLogin
		}
	})
})
// Upload new video
router.post('/upload', (req, res) => {
	const poster = req.body.poster;
	const title = req.body.title.trim().replace(/ +(?= )/g, '');
	const description = req.body.description.trim().replace(/ +(?= )/g, '');
	const path = req.body.path.trim().replace(/ +(?= )/g, '');
	// Upload file
	// upload(req, res, err => {
	// 	let error = '';
	// 	if (err) {
	// 		if (err.code === 'LIMIT_FILE_SIZE') {
	// 			error = "Видео не более 1гб"
	// 		}
	// 		if (err.code === 'EXTENTION') {
	// 			error = "Расширение только \".mp4\", \".avi\""
	// 		}
	// 	}
	// 	res.json({
	// 		ok: !error,
	// 		error
	// 	});
	// });

	if (!poster || !title) {
		res.json({
			ok: false,
			error: 'not all fields are filled in!',
			fields: ['title', 'poster']
		});
	} else if (title.length < 1 || title.length > 50) {
		res.json({
			ok: false,
			error: 'title length from 1 to 50 characters!',
			fields: ['title']
		});
	}
	// Если все правильно пропускаем
	else {
		// Если все проверки пройдены = ЗАГРУЖАЕМ НОВОЕ ВИДЕО
		let sql = `INSERT INTO videos (
			poster, title, description, path, author) VALUES 
			('${poster}', '${title}', '${description}', '${path}', '${req.session.userLogin}')
		`;
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
});
// Add comment
router.post('/add-comment', (req, res) => {
	// Session {
	const userId = req.session.userId || false;
	const userLogin = req.session.userLogin || false;
	const userAvatar = req.session.userAvatar || false;
	// }
	const body = req.body.body.trim().replace(/ +(?= )/g, '');
	const videoId = req.body.videoId;
	console.log("videoId:");
	console.log(videoId);
	console.log("videoId FULL:");
	console.log(req.headers.referer);
	console.log("BODy");
	console.log(req.body);
	if (!userLogin) {
		res.json({
			code: "NL",
			msg: 'Login failed!'
		});
	} else if (!body) {
		res.json({
			code: "NONE",
			msg: 'not all fields are filled in!',
			fields: ['body']
		});
	} else if (body.length < 1 || body.length > 1000) {
		res.json({
			code: 1500,
			msg: 'body length from 1 to 1000 characters!',
			fields: ['body']
		});
	} else {
		// Если все проверки пройдены = Добавляем комент!
		let sql = `INSERT INTO comments (video, author_id, body) VALUES (?, ?, ?)`;
		db.query(sql, [videoId, userId, body], (err, result) => {
			if (err) throw err;
			if (result) {
				console.log(result);
				res.json({
					ok: true
				});
			}
		});
	}
});

// Check Rate
// Проверяет на наличие поставленной оценки
router.post('/check-rate', (req, res) => {
	// Session {
	const userId = req.session.userId || false;
	const userLogin = req.session.userLogin || false;
	const userAvatar = req.session.userAvatar || false;
	// }
	const videoId = req.headers.referer.slice(-1);
	// Проверяем залогинен или нет
	if (!userLogin) {
		res.json({
			code: 'NL',
			msg: 'Login failed!'
		});
	} else {
		let checkRate = `SELECT * FROM rated_videos WHERE user_login = '${userLogin}' AND video_id = ${videoId};`;
		db.query(checkRate, function (err, result) {
			if (err) throw err;

			if (result[0]) {
				if (result[0].like_dislike == "l") {
					res.json({
						code: '+1',
						msg: 'Вы уже Лайкали!'
					});
				} else if (result[0].like_dislike == "d") {
					res.json({
						code: '-1',
						msg: 'Вы уже Дислайкали!'
					});
				}
			} else {
				res.json({
					code: 'N',
					msg: 'Вы не оценивали'
				});
			}
		});
	}
});
// Like
router.post('/like', (req, res) => {
	// Session {
	const userId = req.session.userId || false;
	const userLogin = req.session.userLogin || false;
	const userAvatar = req.session.userAvatar || false;
	// }
	const videoId = req.headers.referer.slice(-1);

	// Проверяем залогинен или нет
	if (!userLogin) {
		res.json({
			code: 'NL',
			msg: 'Login failed!'
		});
	} else {
		// Ищем в БД если вообще лайк/дислайк
		let query1 = `SELECT * FROM rated_videos WHERE user_login = '${userLogin}' AND video_id = ${videoId};`;
		// Убираем лайк с видео и удаляем запись с лайком
		let query2 = `
    	UPDATE videos SET likes = likes-1 WHERE videos.id = ${videoId};
		DELETE FROM rated_videos WHERE user_login = '${userLogin}' AND video_id = '${videoId}';
    `;
		// Добавляем лайк и убираем дислайк у видео + запись лайков/дизлайков имеет статус L
		let query3 = `
    	UPDATE videos SET likes = likes+1 WHERE videos.id = ${videoId};
    	UPDATE videos SET dislikes = dislikes-1 WHERE videos.id = ${videoId};
    	UPDATE rated_videos SET like_dislike = 'l' WHERE user_login = '${userLogin}' AND video_id = '${videoId}';
    `;
		let query4 = `
    	UPDATE videos SET likes = likes+1 WHERE videos.id = ${videoId};
    	INSERT INTO rated_videos (user_login, video_id, like_dislike) VALUES ('${userLogin}', '${videoId}', 'l');
    `;

		db.query(query1, function (err, result) {
			console.log("Rate: ")
			if (err) throw err;
			if (result[0]) {
				if (result[0].like_dislike == "l") {
					db.query(query2, function (err, result) {
						if (err) throw err;
						res.json({
							code: '+1',
							msg: 'Вы уже Лайкали!'
						});
					});
				} else if (result[0].like_dislike == "d") {
					db.query(query3, function (err, result) {
						if (err) throw err;
						res.json({
							code: '-1',
							msg: 'Вы уже Дислайкали!'
						});
					});
				}
			} else if (!result[0]) {
				db.query(query4, function (err, result) {
					if (err) throw err;
					res.json({
						code: 'N',
						msg: 'Лайк поставлен!'
					});
				});
			}
		});
	}
});
// Dislike
router.post('/dislike', (req, res) => {
	// Session {
	const userId = req.session.userId || false;
	const userLogin = req.session.userLogin || false;
	const userAvatar = req.session.userAvatar || false;
	// }
	const videoId = req.headers.referer.slice(-1);

	// Проверяем залогинен или нет
	if (!userLogin) {
		res.json({
			code: 'NL',
			msg: 'Login failed!'
		});
	} else {

		// Добавляем лайк к видео
		let query1 = `SELECT * FROM rated_videos WHERE user_login = '${userLogin}' AND video_id = ${videoId};`;
		let query2 = `
    	UPDATE videos SET dislikes = dislikes+1 WHERE videos.id = ${videoId};
    	UPDATE videos SET likes = likes-1 WHERE videos.id = ${videoId};
    	UPDATE rated_videos SET like_dislike = 'd' WHERE user_login = '${userLogin}' AND video_id = '${videoId}';
    `;
		let query3 = `
    	UPDATE videos SET dislikes = dislikes-1 WHERE videos.id = ${videoId};
		DELETE FROM rated_videos WHERE user_login = '${userLogin}' AND video_id = '${videoId}'
    `;
		let query4 = `
    	UPDATE videos SET dislikes = dislikes+1 WHERE videos.id = ${videoId};
    	INSERT INTO rated_videos (user_login, video_id, like_dislike) VALUES ('${userLogin}', '${videoId}', 'd');
    `;

		db.query(query1, function (err, result) {
			console.log("Rate: ")
			if (err) throw err;
			if (result[0]) {
				if (result[0].like_dislike == "l") {
					db.query(query2, function (err, result) {
						if (err) throw err;
						res.json({
							code: '+1',
							msg: 'Вы уже Лайкали!'
						});
					});
				} else if (result[0].like_dislike == "d") {
					db.query(query3, function (err, result) {
						if (err) throw err;
						res.json({
							code: '-1',
							msg: 'Вы уже Дислайкали!'
						});
					});
				}
			} else if (!result[0]) {
				db.query(query4, function (err, result) {
					if (err) throw err;
					res.json({
						code: 'N',
						msg: 'Дислайк поставлен!'
					});
				});
			}
		});
	}
});

// Video page
router.get('/:video', (req, res, next) => {
	// Session {
	const userId = req.session.userId || false;
	const userRole = req.session.userRole || false;
	const userLogin = req.session.userLogin || false;
	const userAvatar = req.session.userAvatar || false;
	// }
	const videoId = Number(req.params.video);
	if (!videoId) {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
		console.log('Error 404!!!');
	} else {
		let sql = `
			SELECT * FROM videos WHERE id = ?;
			SELECT COUNT(*) FROM comments WHERE video = ?;
			SELECT *, NULL AS password FROM comments JOIN users ON comments.author_id = users.id WHERE video = ? ORDER BY comments.id DESC;
			SELECT * FROM videos ORDER BY id LIMIT ?, 3;
		`;

		db.query(sql, [videoId, videoId, videoId, videoId], (err, result) => {
			if (err) throw err;

			res.render('video/play', {
				userData: {
					userRole,
					userId,
					userLogin,
					userAvatar
				},
				video: result[0][0],
				commentsCount: result[1][0]["COUNT(*)"],
				comments: result[2],
				data: result[3]
			});
		})

		// Добавляем +1 к просмотрам видео
		let sql1 = `UPDATE videos SET views = views+1 WHERE videos.id = ${videoId} `;
		db.query(sql1, (err, result) => {
			if (err) throw err;
		});
	}
});
// Подгружать видео на страницу PLAY
router.post('/more', (req, res) => {
	const quantity = req.body.videos + 1;
	console.log(quantity)

	let sql = `SELECT * FROM videos ORDER BY id LIMIT ?, 3`;
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