var config = require('./.config.json');
console.log('connecting to -> ', config.remote_websocket);
var s = require('socket.io-client')(config.remote_websocket);
var request = require('superagent');
var chalk = require('chalk');

s.on('connect', () => {
    console.log(chalk.green('client connection'));
});

s.on('all_torrents', (data) => {
    console.log(chalk.blue('all_torrents'));
    request
        .get(config.local_server + 'all_torrents')
        .end((err, res) => {
            console.log(chalk.cyan(res.text));
            s.emit('all_torrents', res.text);
        });
});

s.on('movies', function(data) {
    console.log(chalk.blue('movies'));
    request
        .get(config.local_server + 'movies')
        .end((err, res) => {
            console.log(chalk.cyan(res.text));
            s.emit('movies', res.text);
        });
});

s.on('series', function(data) {
    console.log(chalk.blue('series'));
    request
        .get(config.local_server + 'series')
        .end((err, res) => {
            console.log(chalk.cyan(res.text));
            s.emit('series', res.text);
        });
});

s.on('add_torrent', function(data) {
    console.log(chalk.blue('add_torrent ->', data));
    request
        .post(config.local_server + 'add_torrent')
        .send(data)
        .end((err, res) => {
            console.log(chalk.cyan(res.text));
            s.emit('add_torrent', res.text);
        });
});

s.on('torrents_status', (data) => {
    console.log(chalk.blue('torrents_status'));
    request
        .get(config.local_server + 'torrents_status')
        .end((err, res) => {
            console.log(chalk.cyan(res.text));
            s.emit('torrents_status', res.text);
        });
});

s.on('remove_torrent', (data) => {
    console.log(chalk.blue('remove_torrent'));
    request
        .post(config.local_server + 'remove_torrent')
        .send(data)
        .end((err, res) => {
            console.log(chalk.cyan(res.text));
            s.emit('remove_torrent', res.text);
        });
});

s.on('search', (data) => {
    console.log(chalk.blue('search', data));
    request
        .post(config.local_server + 'search')
        .send(data)
        .end((err, res) => {
            console.log(chalk.cyan(res.text));
            s.emit('search', res.text);
        });
});
