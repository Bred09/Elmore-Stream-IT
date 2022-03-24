const router = require('express').Router();

var result = {name: 'William', num: 134};
var my_obj = ['a'];

router.get('/video', (req, res) => {
	res.render('play-page', {
		users: result
	});
});

module.exports = router;