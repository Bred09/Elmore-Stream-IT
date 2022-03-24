const router = require('express').Router();

var stylePathCreate = "create";
var stylePathLogin = "login";
var stylePathReset = "reset";


// Create new account page
router.get('/create', (req, res) => {
	res.render('create-page', {
		data: "Hello",
		wrapper: stylePathCreate
	});
})
// Login page
router.get('/login', (req, res) => {
	res.render('login-page', {
		wrapper: stylePathLogin
	});
})
// Reset password page
router.get('/reset', (req, res) => {
	res.render('reset-page', {
		wrapper: stylePathReset
	});
})

module.exports = router;