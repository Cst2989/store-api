// routes/api/index.js
const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product');
const manufacturerController = require('../../controllers/manufacturer');

const mysql = require('mysql');

const db = mysql.createPool({
  host: '144.76.145.178',
  user: 'vladstoica15_sprints',
  password: '-WuTLTFxSD$X',
  database: 'vladstoica15_sprints',
  connectionLimit: 10000
});

router.get('/manufacturers', manufacturerController.all);
router.post('/manufacturers', manufacturerController.create);
router.get('/products', productController.all);
router.get('/products/:id', productController.byId);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.remove);
router.post('/upload-cars', productController.upload);

router.post('/login', function(req, res) {
  var username = req.body.username; // a valid username is admin
  var password = req.body.password; // a valid password is admin123
  var query =
    "SELECT * FROM users where username = '" +
    username +
    "' and password = '" +
    password +
    "'";

  db.query(query, function(err, row) {
    console.log(row);
    if (err) {
      console.log('ERROR', err);
      res.json(err);
    } else if (row.length < 1) {
      res.json('No username or password');
    } else {
      res.json(row[0]);
    }
  });
});

router.post('/register', function(req, res) {
  var username = req.body.username; // a valid username is admin
  var password = req.body.password; // a valid password is admin123
  var query =
    "INSERT INTO users (username, password) VALUES ('" +
    username +
    "', '" +
    password +
    "')";

  db.query(query, function(err1, row) {
    console.log('ERROR', err1);
    var query2 = "SELECT * FROM users where id = '" + row.insertId + "'";
    db.query(query2, function(err, row) {
      if (err) {
        console.log('ERROR', err);
        res.json(err);
      } else if (row.length < 1) {
        res.json('No username or password');
      } else {
        res.json(row[0]);
      }
    });
  });
});

router.post('/update-profile', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var city = req.body.city;
  var id = req.body.id;
  var query =
    "UPDATE users SET name = '" +
    name +
    "', email = '" +
    email +
    "', phone = '" +
    phone +
    "', city = '" +
    city +
    "' where id = '" +
    id +
    "'";
  db.query(query, function(err, row) {
    console.log(row);
    if (err) {
      console.log('ERROR', err);
      res.json(err);
    } else if (row.length < 1) {
      res.json('No user found');
    } else {
      res.json(row[0]);
    }
  });
});

router.post('/update-profile-headers', function(req, res) {
  if (req.headers.authorization !== 'Bearer YWRtaW5AYWRtaW4=') {
    res.status(401).end();
  } else {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var city = req.body.city;
    var id = req.body.id;
    var query =
      "UPDATE users SET name = '" +
      name +
      "', email = '" +
      email +
      "', phone = '" +
      phone +
      "', city = '" +
      city +
      "' where id = '" +
      id +
      "'";
    db.query(query, function(err, row) {
      console.log(row);
      if (err) {
        console.log('ERROR', err);
        res.json(err);
      } else if (row.length < 1) {
        res.json('No user found');
      } else {
        res.json(row[0]);
      }
    });
  }
});

router.post('/reset', function(req, res) {
  var username = req.body.username;
  var password = req.body.username;
  var query =
    "UPDATE users SET password = '" +
    password +
    "' where username = '" +
    username +
    "'";
  db.query(query, function(err, row) {
    if (err) {
      console.log('ERROR', err);
      res.json(err);
    } else {
      res.json(row);
    }
  });
});
module.exports = router;
