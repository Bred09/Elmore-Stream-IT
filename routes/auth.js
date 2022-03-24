const router = require('express').Router();

// Create new account page
router.get('/create', (req, res) => {
	res.render('create-page', {
		data: "Hello"
	});
})
// Login page
router.get('/login', (req, res) => {
	res.render('login-page');
})
// Reset password page
router.get('/reset', (req, res) => {
	res.render('reset-page');
})

module.exports = router;