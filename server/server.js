
var express = require('express');
var app = express();

var obj = {
    name: 'Dibya',
    love: 'Coding'
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/data', (req, res) => {
    res.send(obj);
});

app.listen(3000, () => console.log('App started on port: 3000'));