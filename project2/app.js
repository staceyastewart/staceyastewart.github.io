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
  // console.log(req.params)
});

app.post('/signup', function(req, res){
  let data = req.body
  console.log(data)
  bcrypt
    .hash(data.password_digest, 10, function(err, hash) {
      db
        .none("INSERT INTO users(first_name, last_name, email, password_digest, borough, level) VALUES ($1, $2, $3, $4, $5, $6)", [data.first_name, data.last_name, data.email, hash, data.borough, data.level])
        .then(function(){
          //somehow log the user in
          res.redirect("/")
        })
      }) //end of  bcrypt then
  });




//renders login page
app.get('/login', function(req, res){
  res.render('login/index');
  // console.log(req.params)
});


// app.post('/login', function(req, res){
//   //take the req.body => email, pass
//   //Look up the email in the db
//   let data = req.body
//   db
//     .one("SELECT * FROM users WHERE email = $1", [data.email])
//     .catch(function(){
//       //you would actually have a view here
//       res.send("Authorization failed: Invalid email/password")
//     })
//     .then(function(user){
//       //let the user in
//       bcrypt.compare(data.password, user.password_digest, function(err, comp){
//         if (comp){
//           //create a session for the user
//           req.session.user = user;
//           res.redirect("/")
//         } else {
//           res.send("Authorization failed: Invalid email/password")
//         }
//       })
//     })
//   //SELECT * FROM users WHERE email = email
//   //Compare that user's has pass, to the has of req.body.email

// });











