/*jshint esversion: 6 */
const express = require('express');
const app = express();
const path = require('path');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var multer  = require('multer');
var upload = multer({ dest: path.join(__dirname, 'uploads')});

app.use(express.static('static'));

var Datastore = require('nedb'),
  messages = new Datastore({ filename: 'db/messages.db', autoload: true, timestampData : true}),
  users = new Datastore({ filename: 'db/users.db', autoload: true });

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

var Message = (function(){
    return function item(message){
        this.content = message.content;
        this.username = message.username;
        this.upvote = 0;
        this.downvote = 0;
    };
}());

// Create

app.post('/api/users/', upload.single("picture"), function (req, res, next) {
    // check for existing user
    users.findOne({_id: req.body.username}, function(err, item) {
        if (err) return res.status(500).end(err);
        if (item) return res.status(409).end("Username:" + req.body.username + " already exists");
        // insert user into db
        users.insert({_id: req.body.username, picture: req.file}, function(err, user) {
            if (err) return res.status(500).end(err);
            return res.redirect("/");
        });
    });
});

app.post('/api/messages/', function (req, res, next) {
    var message = new Message(req.body);
    messages.insert(message, function (err, item) {
        if (err) return res.status(500).end(err);
        return res.json(item);
    });
});

// Read

app.get('/api/messages/', function (req, res, next) {
    messages.find({}).sort({createdAt:-1}).limit(10).exec(function(err, items) {
        if (err) return res.status(500).end(err);
        return res.json(items);
    });
});

app.get('/api/users/', function (req, res, next) {
    var usernames = [];
    users.find({}).exec(function(err, items) {
        if (err) return res.status(500).end(err);
        // get all usernames
        items.forEach(function(element) {
            usernames.push(element._id);
        });
        return res.json(usernames);
    });
});

app.get('/api/users/:username/profile/picture/', function (req, res, next) {
    users.findOne({_id: req.params.username}, function (err, item) {
        if (err) return res.status(404).end('username ' + req.params.username + ' does not exists');
        else {
            var profile = item.picture;
            res.setHeader('Content-Type', profile.mimetype);
            res.sendFile(profile.path);
        }
    });
});

// Update

app.patch('/api/messages/:id/', function (req, res, next) {
    messages.findOne({_id: req.params.id}, function (err, item) {
        if (err) return res.status(500).end(err);
        if (!item) return res.status(404).end("Message id:" + req.params.id + " does not exists");
    
        switch (req.body.action) {
            case ("upvote"):
                messages.update({_id: item._id}, { $set: {upvote: item.upvote+1}}, {}, function (err, numReplaced) {
                    if (err) return res.status(500).end(err);
                });
                break;
            case ("downvote"):
                messages.update({_id: item._id}, { $set: {downvote: item.downvote+1}}, {}, function (err, numReplaced) {
                    if (err) return res.status(500).end(err);
                });
                break;
        }
        return res.json(item);
    });
});


// Delete

app.delete('/api/messages/:id/', function (req, res, next) {
    messages.findOne({ "_id": req.params.id }, function(err, item){
        if (err) return res.status(500).end(err);

        if (!item) return res.status(404).end("Message id #" + req.params.id + " does not exists");
        messages.remove({ _id: item._id }, { multi: false }, function(err, num) {  
            res.json(item);
         });
    }); 
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});