const router = require('express').Router();

// Auth page
router.get('/', (req, res) => {
	res.render('auth');
})

module.exports = router;