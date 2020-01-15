// routes/api/index.js
const express                = require('express');
const router                 = express.Router();
const productController      = require('../../controllers/product')
const manufacturerController = require('../../controllers/manufacturer')
const mysql = require('mysql');
const db = mysql.createConnection ({
    host: 'remotemysql.com',
    user: '7W8jy6kswF',
    password: 't8F01TnfaE',
    database: '7W8jy6kswF'
});
// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;
router.get('/manufacturers', manufacturerController.all);
router.post('/manufacturers', manufacturerController.create);
router.get('/products', productController.all);
router.get('/products/:id', productController.byId);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.remove);

router.post('/login', function (req, res) {
    var username = req.body.username; // a valid username is admin
    var password = req.body.password; // a valid password is admin123
    var query = "SELECT name FROM users where username = '" + username + "' and password = '" + password + "'";

    console.log("usernames: " + username);
    console.log("password: " + password);
    console.log('query: ' + query);
    
    db.get(query , function(err, row) {

        if(err) {
            console.log('ERROR', err);
            res.json(err);
        } else if (!row) {
            res.json("No username or password");
        } else {
            res.json('Login successfull!');
        }
    });

});
module.exports = router;
