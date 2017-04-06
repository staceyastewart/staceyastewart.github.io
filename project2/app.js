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


//renders the homepage
app.get('/', function(req, res){
  if(req.session.user){
    //user is logged in
    let data = {
      "logged_in": true,
      "email": req.session.user.email
    }
    res.render("index", data)
  } else {
    //user is not logged in
    res.render("index")
  }
});


//renders the signup page
app.get('/signup', function(req, res){
  res.render('signup/index');
  // console.log(req.params)
});

//lets you sign up
app.post('/signup', function(req, res){
  let data = req.body
  // console.log(data)
  bcrypt
    .hash(data.password_digest, 10, function(err, hash) {
      db
        .none("INSERT INTO users(first_name, last_name, email, password_digest, borough, level) VALUES ($1, $2, $3, $4, $5, $6)", [data.first_name, data.last_name, data.email, hash, data.borough, data.level])
        .catch(function(){
          res.render("signup/show")
        })
        .then(function(){
          //somehow log the user in
          req.session.user = user;
          res.redirect("/")
        })
      }) //end of  bcrypt then
  });


//renders login page
app.get('/login', function(req, res){
  res.render('login/index');
  // console.log(req.params)
});

//actually lets you log in
app.post('/login', function(req, res){
  //take the req.body => email, pass
  //Look up the email in the db
  let data = req.body
  // console.log(data)
  db
    .one("SELECT * FROM users WHERE email = $1", [data.email])
    .catch(function(){
      //you would actually have a view here
      res.render("login/show")
    })
    .then(function(user){
      //let the user in
      bcrypt.compare(data.password, user.password_digest, function(err, comp){
        if (comp){
          //create a session for the user
          req.session.user = user;
          res.redirect("/")
        } else {
          res.render("login/show")
        }
      })
    })

});




//renders the partner forums page
app.get('/partners', function(req, res){
  if(req.session.user){
    //user is logged in
    let data = {
      "logged_in": true,
      "email": req.session.user.email
    }
    res.render("partners/index", data)
  } else {
    //user is not logged in
    res.render("partners/index")
  }
});


//renders page to create new post
app.get('/new', function(req, res){
  if(req.session.user){

    db
      .one("SELECT * FROM users WHERE email = $1", [req.session.user.email])
      .then(function(data){
        // console.log(data)
        let view_data = {
          user: data,
          logged_in: true,
          email: req.session.user.email
        }
        res.render("partners/new", view_data)
      })

  } else {
    //user is not logged in
    res.redirect("/login")
  }
});




//actually lets you log in
app.post('/new', function(req, res){
  console.log(req.session.user)
  let data = req.body
  console.log(data)
  db
    .none("INSERT INTO posts (user_id, title, content, category, level, borough) VALUES ($1, $2, $3, $4, $5, $6)", [req.session.user.id, data.title, data.content, data.category, data.level, data.borough])
    .catch(function(){
      //you would actually have a view here
      // res.render("login/show")
      res.send("Oops! Something bad happened")
    })
    .then(function(user){

      res.redirect("/")
    })
    // .then(function(user){
    //   //let the user in
    //   bcrypt.compare(data.password, user.password_digest, function(err, comp){
    //     if (comp){
    //       //create a session for the user
    //       req.session.user = user;
    //       res.redirect("/")
    //     } else {
    //       res.render("login/show")
    //     }
    //   })
    // })

});



















// using METHOD OVERRIDE for updating
// app.put("/user", function(req,res){
//   db
//   .none("UPDATE users SET email = $1 WHERE email = $2", [req.body.email, req.session.user.email])
//   .catch(function(){
//     //need to put in a catch
//     res.send("fail")
//   })
//   .then(function(){
//     res.send("email updated")
//   })

// })


//lets you logout
app.get('/logout', function(req, res){
  req.session.user = false
  res.redirect("/")
});







