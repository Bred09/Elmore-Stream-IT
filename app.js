// Imports
const express = require('express');
const PORT = process.env.PORT || 3000;
const staticAsset = require('static-asset');
const path = require('path');
// mysql
const db = require('./db');
//session
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
// routes
const routes = require('./routes');
//express
const app = express();


// sessions
var sessionStore = new MySQLStore({
	expiration: 600000,
	createDatabaseTable: true,
	schema: {
		tableName: 'sessiontbl',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
}, db);

app.use(session({
	key: 'keyin',
	secret: "huy",
	resave: false,
	saveUninitialized: true,
	store: sessionStore
}));


// bodyParser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Plugins
app.set('view engine', 'ejs')
app.use(express.static('public'));
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
