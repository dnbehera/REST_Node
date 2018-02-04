var tigerRouter = require('express').Router();

var tigers = [];
var id =0;

//Router Level MiddleWare

var updateId = function(req, res, next){
    req .body.id = ++id;
    next()
}
tigerRouter.param('id', (req, res, next, id) => {
    let lion = _.find(tigers, {id: id});
    req.body = lion;
    next();
})

tigerRouter.get('/', (req, res) => {
    res.setHeader('Content-Type', 'tigerRouterlication/json');// Doesn't get changed or tigerRouterlied for non modified data
    res.status(200).send(tigers);
});

tigerRouter.get('/:id', (req, res, next) => {
    if ( req.body !== '') {
        res.json(req.body); 
    } 
    next(new Error(`No tigers Found with id = ${req.params.id}`));
})

tigerRouter.post('/', updateId, (req, res) => {
    tigers.push(req.body);
    res.json(req.body);
});

tigerRouter.put('/:id', (req, res) => {
    let lion = req.body;
    for( let i = 0; i < tigers.length; i++){
        if ( req.params.id === tigers[i].id ){
            tigers[i] = lion;
            break;
        }
    }
    res.json(tigers);
});

tigerRouter.delete('/:id', (req, res) => {
    for( let i = 0; i < tigers.length; i++){
        if ( req.params.id === tigers[i].id ){
            tigers.splice(i-1, 1);
            break;
        }
    }
    res.json(tigers);
});

//Error handling Middlewares
tigerRouter.use( (err, req, res, next) => {
    console.log("this is in error handler");
    console.log(err);
    next();
});

module.exports = tigerRouter;