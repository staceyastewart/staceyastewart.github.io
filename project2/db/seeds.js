
var fetch = require('node-fetch');
const pgp = require('pg-promise')();

var db = pgp('postgres://staceyastewart@localhost:5432/tennis');
let url = "http://www.nycgovparks.org/bigapps/DPR_Parks_001.json"

fetch(url)
  .then(function(r){
          return r.json();
  })
  .then(function(json){
    for (var i = 0; i < json.length; i++) {
      // console.log(json[i].Name);
      // console.log(json[i].Location);
      // console.log(json[i].Zip);
      db.any("INSERT INTO courts (court_name, court_address, court_zip_code) VALUES ($1,$2,$3)", [json[i].Name, json[i].Location, json[i].Zip])
    }
  })
