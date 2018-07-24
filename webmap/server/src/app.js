const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path');
const session = require('express-session')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static('resources'));
app.use(session({secret:"tropang pldt",resave:false,saveUninitialized:true}));

global.__basedir = __dirname;

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

var Marker = require("../models/marker");
var User = require("../models/accounts");

const markers = require('./controllers/marker_controller');
const useraccounts = require('./controllers/accountRegister');
const subscribers = require('./controllers/subscriber_controller')


app.get('/lcp', (req, res) => {
	Marker.find().exec(function (err, results) {
		var count = results.length
		console.log(count) 
	});
});

//MARKER ROUTERS
app.get('/markers', markers.findAll);
app.get('/markers/lcp/:lpname', markers.findLcp)
app.get('/markers/nap', markers.findAllNaps)
app.get('/markers/lcp', markers.findAllLcps)
app.get('/markers/reserved', markers.findAllReserved)
app.get('/markers/:name', markers.findOne)
app.post('/add_marker', markers.save);
app.put('/markers/update/:mID', markers.update);
app.delete('/markers/delete/:mID', markers.delete);

//get icon
app.get('/icon_:type', (req, res) => {
	var type = req.params.type;
	res.setHeader('Content-Type', 'image/svg+xml');
	res.sendFile(path.join(__dirname + '/assets/marker_'+type+'.svg'));
})

//SUBSCRIBERS
app.get('/subscribers', subscribers.findAll)
app.get('/subscribers/:sip_no', subscribers.getSub)
app.post('/addsubscriber', subscribers.save)
app.delete('/subscribers/delete/:sID', subscribers.delete)
app.put('/subscribers/edit/:eID', subscribers.update)



app.post('/register', useraccounts.save);

//account login
app.post('/login', function(req ,res) {
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({username: username, password: password}, function(err, user){
		if(err){
			console.log(err)
			return res.status(500).send();
		}

		if(!user) {
			return res.status(404).send();
		}

		req.session.user = user;
		return res.status(200).send();
	})
});

//account logout
app.get('/logout', function(req, res){
	req.session.destroy();
	return res.status(200).send();

	res.redirect('/users/login');
});

app.get('/dashboard', function(req ,res){
	if(!req.session.user) {
		return res.status(401).send();
	}

	return res.status(200).send(

	);

});

app.put('/posts/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }

	  post.name = req.body.name
	  post.description = req.body.description
	  post.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

app.delete('/posts/:id', (req, res) => {
	var db = req.db;
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.get('/post/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }
	  res.send(post)
	})
})

app.listen(process.env.PORT || 8081)
