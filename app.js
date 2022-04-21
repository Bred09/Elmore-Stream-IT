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
// express
const app = express();
// socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

// sessions
var sessionStore = new MySQLStore({
	expiration: 10800000,
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

// user page
app.use('/character/', routes.user);

// video upload
app.use('/video/', routes.video);

// Test polygon
app.get('/polygon', (req, res) => {
	res.render('polygon');
})

  




app.get('/', (req, res) => {
	if (req.subdomains[0] === 'dop') {
		console.log(req.subdomains)
		console.log("req.subdomains")
	}
})


function fun(arg) {
	let a = "Hello, world!";
	return a
}
let b = fun()
console.log(b)





// Start server
server.listen(PORT, () => {
	console.log(`Server Run on port: ${PORT}`)
})
