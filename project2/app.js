const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
let methodOverride = require('method-override');
var fetch = require('node-fetch');



/* BCrypt stuff here */
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method')); //method override

app.use(session({
  secret: 'TENNISPARTNERS',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


var db = pgp('postgres://staceyastewart@localhost:5432/tennis');

app.listen(3000, function () {
  console.log('Shoebill Auth App: listening on port 3000!');
});

app.get('/', function(req, res){
//if the user is not logged in, we show them a login form that links to sign up
//if the user is signed in then we show them the super secret stuff
  // if(req.session.user){
  //   //user is logged in
  //   let data = {
  //     "logged_in": true,
  //     "email": req.session.user.email
  //   }
  //   res.render("index", data)
  // } else {
  //   //user is not logged in
  //   res.render("index")
  // }

  res.render("index")
});


app.get('/signup', function(req, res){
  res.render('signup/index');
});














