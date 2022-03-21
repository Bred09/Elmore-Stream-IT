const router = require('express').Router();

var result = {name: 'BEKa', num: 9};
var my_obj = ['a'];

router.get('', (req, res) => {
	res.render('main', {
		users: result
	});
});

module.exports = router;