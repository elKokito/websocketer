var config = require('./.config.json');
console.log('connecting to -> ', config.remote_websocket);
var s = require('socket.io-client')(config.remote_websocket);
var request = require('superagent');

s.on('connect', () => {
    console.log('client connection');
});

s.on('all_torrents', (data) => {
    console.log('on all_torrents');
    request
        .get(config.local_server + 'all_torrents')
        .end((err, res) => {
            console.log(res.text);
            s.emit('all_torrents', res.text);
        });
});

s.on('movies', function(data) {
    console.log('on movies');
    request
        .get(config.local_server + 'movies')
        .end((err, res) => {
            console.log(res.text);
            s.emit('movies', res.text);
        });
});

s.on('series', function(data) {
    console.log('on series');
    request
        .get(config.local_server + 'series')
        .end((err, res) => {
            console.log(res.text);
            s.emit('series', res.text);
        });
});

s.on('add_torrent', function(data) {
    console.log('on add_torrent');
    console.log('add_torrent ->', data);
    request
        .post(config.local_server + 'add_torrent')
        .send(data)
        .end((err, res) => {
            console.log(res.text);
            s.emit('add_torrent', res.text);
        });
});
