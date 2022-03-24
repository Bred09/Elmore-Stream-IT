// Imports
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const staticAsset = require('static-asset');
const path = require('path');
// mysql
const db = require('./db');
// routes
const routes = require('./routes');

// Plugins
app.set('view engine', 'ejs')
// более короткая версия
// app.use(express.static('public'));
// более конкретная версия
app.use(express.static(path.join(__dirname, 'public')));
app.use(staticAsset(path.join(__dirname, 'public')));

	//Views
// home
app.use('/', routes.main);

// sign in/up
app.use('/auth/', routes.auth);

// play video
app.use('/play/', routes.play);

// Profile of character
app.use('/character/', routes.character);




// Start server
app.listen(PORT, () => {
	console.log(`Server Run on port: ${PORT}`)
})
