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

// Video page
router.get('/:video', async (req, res, next) => {
	const userId = req.session.userId;
	const userLogin = req.session.userLogin;
	const videId = req.params.video;
	console.log(`URL: ${videId}`)
	if (!videId) {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
		console.log('Error 404!!!');
	} else {
		try {
			let sql = `SELECT * FROM videos WHERE id = '${videId}'`;
			const queryToDB = await db.query(sql, (err, result) => {
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
					console.log(`Video ${videId} found!`);
				}
			});
		} catch {
			throw new Error("Server error!")
		}
	}
})

module.exports = router;