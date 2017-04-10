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
app.get("/", function(req, res){
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
});


//lets you sign up
app.post('/signup', function(req, res){
  let data = req.body
  // console.log(data)
  bcrypt
    .hash(data.password_digest, 10, function(err, hash) {
      db
        .none("INSERT INTO users(first_name, last_name, email, password_digest, username, borough, level) VALUES ($1, $2, $3, $4, $5, $6, $7)", [data.first_name, data.last_name, data.email, hash, data.username, data.borough, data.level])
        .then(function(id){
          //somehow log the user in
          db
            .one("SELECT * FROM users WHERE email = $1", [data.email])
            .then(function(el){
              console.log(el)
              req.session.user = el
              res.redirect("/partners");
            })
        })
        .catch(function(e){
          console.log(e);
          res.render("signup/show")
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
  console.log(data)
  db
    .one("SELECT * FROM users WHERE email = $1", [data.email])
    .then(function(user){
      //let the user in
      console.log(user)
      bcrypt.compare(data.password, user.password_digest, function(err, comp){
        if (comp){
          //create a session for the user
          req.session.user = user;
          res.redirect("/partners")
        } else {
          res.render("login/show")
        }
      })
    })
    .catch(function(){
      //in case something goes wrong
      res.render("login/show")
    })
});

//renders the partner forums home page
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
app.get('/partners/new', function(req, res){
  // console.log(req.session.user)
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


//lets you create a new post in for the forum
//when you do, it redirects you to your post
app.post('/new', function(req, res){
  console.log("POST DATA")
  console.log(req.session.user)
  let data = req.body
  console.log(data)
  db
    .one("INSERT INTO posts (user_id, title, content, category, level, borough, username) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id as new_id", [req.session.user.id, data.title, data.content, data.category, data.level, data.borough, req.session.user.username])
    .then(function(data){
      res.redirect("/partners/" + data.new_id)
    })
    .catch(function(){
      //should add a view
      res.send("Oops! Something bad happened")
    })
});



//renders the posts page
app.get("/partners/all", function(req, res){
  if(req.session.user){
    //user is logged in
    db
      .any("SELECT * FROM posts ORDER BY id DESC")
      .then(function(data){
        // console.log(data)
        let view_data = {
          posts: data,
          logged_in: true,
          email: req.session.user.email
        }
        res.render("partners/all", view_data)
      })
  } else {
    //user is not logged in
    res.redirect("/login")
  }
});


//renders each individual post page
app.get("/partners/:id", function(req, res){
  let id = req.params.id
  if(req.session.user){
    db
    .one("SELECT * FROM posts WHERE id = $1", id)
    .then(function(data){
      db
        .any("SELECT * FROM comments WHERE post_id = $1", id)
        .then(function(stuff){
          // console.log(data) //this gives you the post
          // console.log(stuff) //this gives you the comments
          //if this is the user's post:
          if(data.user_id===req.session.user.id){
            let view_data = {
              post: data,
              comment: stuff,
              logged_in: true,
              email: req.session.user.email,
              this_users_post: true,
              user: req.session.user
            }
            res.render("partners/id", view_data);
          } else { //if this is not the user's post
            let view_data = {
              post: data,
              comment: stuff,
              logged_in: true,
              email: req.session.user.email,
              user: req.session.user
            }
            res.render("partners/id", view_data);
          }
        })
    })
  } else {
    res.redirect("/login")
  }
});


//lets the user delete their own post
app.delete("/partners/:id", function(req, res){
  id = req.params.id
  console.log(id)
  db
    .none("DELETE FROM posts WHERE id = $1", [id])
    .then(function(data){
      res.redirect("/partners/all")
    })
})

//renders the update page
app.get("/partners/update/:id", function(req, res){
  let id = req.params.id
  if(req.session.user){
    db
    .one("SELECT * FROM posts WHERE id = $1", id)
    .then(function(data){
      console.log(data) //this gives the data of the post
      //if the user in this session is the author of the post
      if(data.user_id===req.session.user.id){
        let view_data = {
          post: data,
          logged_in: true,
          email: req.session.user.email,
          this_users_post: true
        }
        res.render("partners/updateid", view_data);
      } else {
        //if this is not your post
        res.redirect("/partners/"+id)
      }
    })
  } else {
    //you are not logged in
    res.redirect("/login")
  }
});


// updates the post
app.put("/post/:id", function(req,res){
  let data = req.body
  db
  .none("UPDATE posts SET title = $1, content = $2, category = $3, level = $4, borough = $5 WHERE id = $6", [data.title, data.content, data.updatecategory, data.level, data.borough, req.params.id])
  .then(function(){
    res.redirect("/partners/"+req.params.id)
  })
  .catch(function(){
    //need to put in a catch
    res.send("fail")
  })
})


//lets you create a new comment on one post
//when you do, it should not refresh the page, but should append to the page
app.post('/comment', function(req, res){
  console.log(req.session.user)
  let current_user = req.session.user
  let data = req.body
  console.log(data)
  console.log(req.params)
  db
    //do I need this to return one since I'm appending to the page?
    .one("INSERT INTO comments (user_id, post_id, content, level, borough, username) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id as new_id", [current_user.id, data.post_id, data.content, data.level, data.borough, current_user.username])
    .then(function(el){
      res.redirect("/partners/" + data.post_id)
    })
    .catch(function(){
      //should add a view
      res.send("Oops! Something bad happened")
    })
});





//renders the courts page
//should be able to view even if you are not logged in
app.get("/courts", function(req, res){
  db
    .any("SELECT * FROM courts")
    .then(function(data){
      // console.log(data)
      let view_data = {
        courts: data
      }
      res.render("courts/index", view_data)
    })
});


//renders each court's page
app.get("/courts/:id", function(req, res){
  console.log(req.params.id)
  let id = req.params.id
  if(id==="Manhattan"){
    let borough = "M";
    db
    .any("SELECT * FROM courts WHERE borough = $1", [borough])
    .then(function(data){
      // console.log(data)
      let view_data = {
        courts: data,
        location: "Manhattan"
      }
      res.render("courts/show", view_data)
    })
  } else if(id==="Brooklyn"){
    let borough = "B";
    db
    .any("SELECT * FROM courts WHERE borough = $1", [borough])
    .then(function(data){
      // console.log(data)
      let view_data = {
        courts: data,
        location: "Brooklyn"
      }
      res.render("courts/show", view_data)
    })
  } else if (id==="Bronx"){
    let borough = "X";
    db
    .any("SELECT * FROM courts WHERE borough = $1", [borough])
    .then(function(data){
      // console.log(data)
      let view_data = {
        courts: data,
        location: "Bronx"
      }
      res.render("courts/show", view_data)
    })
  } else if(id==="Queens"){
    let borough = "Q";
    db
    .any("SELECT * FROM courts WHERE borough = $1", [borough])
    .then(function(data){
      // console.log(data)
      let view_data = {
        courts: data,
        location: "Queens"
      }
      res.render("courts/show", view_data)
    })
  } else if(id==="StatenIsland"){
    let borough = "R";
    db
    .any("SELECT * FROM courts WHERE borough = $1", [borough])
    .then(function(data){
      // console.log(data)
      let view_data = {
        courts: data,
        location: "Staten Island"
      }
      res.render("courts/show", view_data)
    })
  } else if(id==="onlinebooking"){
    db
    .any("SELECT * FROM onlineCourts")
    .then(function(data){
      // console.log(data)
      let view_data = {
        onlineCourts: data
      }
      res.render("courts/online", view_data)
    })
  } else {
    res.redirect("/courts")
  }
});



//renders the permits page
//should be able to view even if you are not logged in
app.get("/permits", function(req, res){
  db
    .any("SELECT * FROM tennisPermits")
    .then(function(data){
      // console.log(data)
      let view_data = {
        permits: data
      }
      res.render("permits/index", view_data)
    })
});






//lets you logout
app.get('/logout', function(req, res){
  req.session.user = false
  res.redirect("/")
});




