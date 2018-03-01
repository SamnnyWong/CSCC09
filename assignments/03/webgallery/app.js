const path = require('path');
const crypto = require('crypto');
const session = require('express-session');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const Datastore = require('nedb');
const cookie = require('cookie');


app.use(express.static('static'));
app.use(bodyParser.json());
app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});



// app.use(function (req, res, next){
//     var cookies = cookie.parse(req.headers.cookie || '');
//     req.username = (cookies.username)? cookies.username : null;
//     console.log("HTTP request", req.username, req.method, req.url, req.body);
//     next();
// });


app.use(function (req, res, next){
    var cookies = cookie.parse(req.headers.cookie || '');
    req.username = ('username' in req.session)? req.session.username : null;
    // clear cookie if not in session
    if (!req.username) {
        res.clearCookie(req.headers.cookie);
    }
    console.log("HTTP request", req.username, req.method, req.url, req.body);
    next();
});


const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});





function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

var users = new Datastore({ filename: 'db/users.db', autoload: true });
var messages = new Datastore({ filename: path.join(__dirname,'db', 'messages.db'), autoload: true, timestampData : true});
var images = new Datastore({ filename: 'db/images.db', autoload: true });
var gallery = new Datastore({ filename: 'db/gallery.db', autoload: true });

var multer  = require('multer');
var upload = multer({ dest: path.join(__dirname, 'uploads')});

// var user = {id: username, hash:"$$$$$", sLt:"$$$$$"};
//
// var gallery = {username:["imageid"]};
//
// var image = {imageid:"001", title: "title", author:"username"};
//
// var comments = {author:username, imageid:"%%%%%", };



// images api
app.post('/api/images/', upload.single("picture"), function (req, res, next) {
    var image_id = guid();
    images.insert({picture: req.file, _id :image_id}, function(err, user) {
        if (err) return res.status(500).end(err);
        return res.redirect("/");
    });

    // get the username and image id
    //find if the user gallery is existed or not
    //add the newly added image id to the gallery
});
//retrieve and delete a given image
app.get('/api/images/:id/', function (req, res, next) {
});

app.delete('/api/images/:id/', function (req, res, next) {
});



// comment api

app.post('/api/messages/', function (req, res, next) {

});

app.get('/api/messages/', function (req, res, next) {
});

app.get('/api/messages/:id/', function (req, res, next) {
    res.json([{"content": "Hello World!", "author": "Me"}]);
});


app.delete('/api/messages/:id/', function (req, res, next) {
    res.json({"id": 48});
});




// user login logout api
// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signup/
app.post('/signup/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(16).toString('base64');
    var hash = genhash(password, salt);
    users.findOne({_id: username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (user) return res.status(409).end("username " + username + " already exists");
        users.update({_id: username},{_id: username, hash: hash, salt: salt}, {upsert: true}, function(err){
            if (err) return res.status(500).end(err);
            // initialize cookie
            res.setHeader('Set-Cookie', cookie.serialize('username', username, {
                path : '/',
                Age: 60 * 60 * 24 * 7
            }));
            return res.json("user " + username + " signed up");
        });
    });
});

// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signin/
app.post('/signin/', function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    // retrieve user from the database
    users.findOne({_id: username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (!user) return res.status(401).end("access denied");
        if (user.hash !== genhash(password, user.salt)) return res.status(401).end("access denied");

        req.session.user = user; //write

        // initialize cookie
        res.setHeader('Set-Cookie', cookie.serialize('username', username, {
            path : '/',
            maxAge: 60 * 60 * 24 * 7
        }));
        return res.json("user " + username + " signed in");
    });
});

// curl -b cookie.txt -c cookie.txt localhost:3000/signout/
app.get('/signout/', function (req, res, next) {
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
        path : '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    res.redirect('/');
});





var isAuthenticated = function(req, res, next) {
    if (!req.username) return res.status(401).end("access denied");
    next();
};





