// Imports
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// mysql
const db = require('./db');
// routes
const routes = require('./routes');

// Plugins
app.set('view engine', 'ejs')
app.use(express.static('public'));

	//Views
// home
app.use('/', routes.main);

// sign in/up
app.use('/auth/', routes.auth);

// play video
app.use('/play/', routes.play);




// Start server
app.listen(PORT, () => {
	console.log(`Server Run on port: ${PORT}`)
})
