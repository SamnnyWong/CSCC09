const express = require('express');
const app = express();

app.use(express.static('static'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

var Message = (function(){
    var id = 0;
    return function item(message){
        this._id = id++;
        this.content = message.content;
        this.username = message.username;
        this.upvote = 0;
        this.downvote = 0;
    }
}());






var messages = [];
var users = {};



app.post('/', function (req, res, next) {
    console.log("hello");
    res.json(req.body);
});




//
// Create a message
// Method: POST
// Url: /api/messages/
// Request body (JSON object): {"content": "Hello World!", "author": "Me"}
// Body (JSON object): {"_id": "xy6r3kt45", "content": "Hello World!", "author": "Me", "upvote": 0, "downvote": 0}
//

app.post('/api/messages/', function (req, res, next) {
    var message = new Message(req.body);
    messages.unshift(message);
    return res.json(message);
});


//
// Get the latest messages
// Method: GET
// Url: /api/messages/
// Response body (JSON list): [{"_id": "xy6r3kt45", "content": "Hello World!", "author": "Me", "upvote": 0, "downvote": 0}, ...]
//

app.get('/api/messages/', function (req, res, next) {
    console.log(req.query.offset);
    return res.json(messages.slice(req.query.offset, 5));
});



// Delete a specific message
// Method: DELETE
// Url: /api/messages/xy6r3kt45/
// Response body (JSON object): {"_id": "xy6r3kt45", "content": "Hello World!", "author": "Me", "upvote": 0, "downvote": 0}
//

app.delete('/api/messages/:id/', function (req, res, next) {
    var index = messages.findIndex(function(message){
        return message._id == req.params.id;
    });
    if (index === -1) return res.status(404).end("Message id:" + req.params.id + " does not exists");
    var message = messages[index];
    messages.splice(index, 1);
    return res.json(message);
});



app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});





//





