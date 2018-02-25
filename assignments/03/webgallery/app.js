const express = require('express');
const app = express();

app.use(express.static('static'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});





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
    console.log("wwwwwwwwwwwwwwwwwwwwwwww");

});





app.get('/api/messages/', function (req, res, next) {
    res.json([{"content": "Hello World!", "author": "Me"}]);
});

app.delete('/api/messages/:id/', function (req, res, next) {
    res.json({"id": 48});
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
// Get the latest messages
// Method: GET
// Url: /api/messages/
// Response body (JSON list): [{"_id": "xy6r3kt45", "content": "Hello World!", "author": "Me", "upvote": 0, "downvote": 0}, ...]
//
//
//
// Delete a specific message
// Method: DELETE
// Url: /api/messages/xy6r3kt45/
// Response body (JSON object): {"_id": "xy6r3kt45", "content": "Hello World!", "author": "Me", "upvote": 0, "downvote": 0}
//
//





