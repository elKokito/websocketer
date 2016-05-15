var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var s = null


app.get('/all_torrents', (req, res) => {

    console.log('req -> /all_torrents');
    s.once('all_torrents', (data) => {
        res.send(data);
    });
    s.emit('all_torrents');
});

app.get('/movies', (req, res, next) => {
    console.log('req -> /movies');
    s.emit('movies');
    s.once('movies', (data) => {
        res.send(data);
    });
})

app.get('/series', (req, res, next) => {
    console.log('req -> /series');
    s.emit('series');
    s.once('series', (data) => {
        res.send(data);
    });
})

app.post('/add_torrent', (req, res, next) => {
    console.log('req -> /add_torrent', req.body);
    s.emit('add_torrent', req.body);
    s.once('add_torrent', (data) => {
        res.send(data);
    });
})

app.post('/remove_torrent', (req, res, next) => {
    console.log('req -> /remove_torrent');
    s.emit('remove_torrent', req.text);
    s.once('remove_torrent', (data) => {
        res.send(data);
    });
})

app.get('/torrents_status', (req, res, next) => {
    console.log('req -> /torrents_status');
    s.once('torrents_status', (data) => {
        res.send(data);
    });
})

app.get('/test_websocket', (req, res, next) => {
    response = s ? 'connected': 'disconnect';
    res.send(response);
});

io.on('connection', function(socket) {
    console.log('io connection');
    s = socket;

    socket.on('disconnect', function() {
        console.log('disconnect');
        s = null;
    });
})

server.listen(3000);
console.log('express server started on port 3000');
