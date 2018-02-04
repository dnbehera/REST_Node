
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();

var lions = [];
var id =0;
//Router Level MiddleWare

var updateId = function(req, res, next){
    req .body.id = ++id;
    next()
}

//lions.push({name: 'Dibynsdsna'})
//App Level MiddleWare
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.param('id', (req, res, next, id) => {
    let lion = _.find(lions, {id: id});
    req.body = lion;
    next();
})

app.get('/lions', (req, res) => {
    res.setHeader('Content-Type', 'application/json');// Doesn't get changed or applied for non modified data
    res.status(200).send(lions);
});

app.get('/lions/:id', (req, res, next) => {
    if ( req.body !== '') {
        res.json(req.body); 
    } 
    next(new Error(`No Lions Found with id = ${req.params.id}`));
})

app.post('/lions', updateId, (req, res) => {
    lions.push(req.body);
    res.json(req.body);
});

app.put('/lions/:id', (req, res) => {
    let lion = req.body;
    for( let i = 0; i < lions.length; i++){
        if ( req.params.id === lions[i].id ){
            lions[i] = lion;
            break;
        }
    }
    res.json(lions);
});

app.delete('/lions/:id', (req, res) => {
    for( let i = 0; i < lions.length; i++){
        if ( req.params.id === lions[i].id ){
            lions.splice(i-1, 1);
            break;
        }
    }
    res.json(lions);
});

//Error handling Middlewares
app.use( (err, req, res, next) => {
    console.log("this is in error handler");
    console.log(err);
    next();
});
app.listen(3000, () => console.log('App started on port: 3000'));