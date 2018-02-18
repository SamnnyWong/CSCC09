const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});


var Datastore = require('nedb')
    , messages = new Datastore({ filename: 'db/messages.db', autoload: true, timestampData : true})
    , users = new Datastore({ filename: 'db/users.db', autoload: true });




var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

app.post('/api/users/', upload.single('picture'), function (req, res, next) {
    console.log("#############################################");
    console.log(req.file);
    console.log("#############################################");
    // store req.file in the database
    res.redirect('/');
});


app.post('/api/file', function(req, res) {
    var upload = multer({storage: storage}).single('userFile');
    upload(req, res, function(err) {
        res.end('File is uploaded')
    })
});

// Create

app.post('/api/users/', function (req, res, next) {
    var username = req.body.username;
    var user_pic = req.picture;
    // check if user already exists in the database
    users.findOne({_id: username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (user) return res.status(409).end("username " + username + " already exists");

        var doc = {_id: username
            , user_pic: user_pic
        };
        users.insert(doc, function(err){
            if (err) return res.status(500).end(err);
            return res.redirect('/');
        });
    });
});

app.post('/api/messages/', function (req, res, next) {
    var message = req.body.content;
    var username = req.body.username;
    var doc = {username: username
        , content: message
        , upvote: 0
        , downvote: 0
    };
    messages.insert(doc, function(err){
        if (err) return res.status(500).end("something went wrong");
        return res.redirect('/');
    });



    // var message = new Message(req.body);
    // messages.unshift(message);
    // return res.json(message);
});

// Delete

app.delete('/api/messages/:id/', function (req, res, next) {
    messages.find({_id: req.params.id}).exec(function (err, item) {
        if (item.length == 0) return res.status(404).end("Message id:" + req.params.id + " does not exists");
        else {
            var message = item[0];
            // messages.splice(index, 1);

            messages.remove({_id: req.params.id}, function (err, item) {
                if (err) return res.status(500).end(err);
            });
            return res.json(message);
        }
    });

});

// Read

app.get('/api/messages/', function (req, res, next) {
    // messages.find({}).sort({createdAt:-1}).limit(10).exec(function(err, data) {
    //     //
    //
    // });
    messages.find({}).sort({createdAt:-1}).exec(function(err, items) {
        if (err) return res.status(500).end(err);
        return res.json(items.slice(req.query.offset, 5));
    });



});

app.get('/api/users/', function (req, res, next) {
    users.find({}).exec(function(err, items) {
        if (err) return res.status(500).end(err);

        return res.json(items);
    });
});

// Update

app.patch('/api/messages/:id/', function (req, res, next) {
    messages.find({_id: req.params.id}).exec(function (err, item) {
        if (item.length == 0) return res.status(404).end("Message id:" + req.params.id + " does not exists");
        else {
            var message = item[0];
            switch (req.body.action){
                case ("upvote"):
                    message.upvote+=1;
                    message.downvote+=1;
                    break
                case ("downvote"):
                    message.downvote+=1;
                    break;
            }
            messages.update({_id: req.params.id}, message, function (err, item) {

                if (err) return res.status(500).end(err);
                return res.json(item);
            });
        }
    });
});




const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
