var lionRouter = require('express').Router();

var lions = [];
var id =0;

//Router Level MiddleWare

var updateId = function(req, res, next){
    req .body.id = ++id;
    next()
}
lionRouter.param('id', (req, res, next, id) => {
    let lion = _.find(lions, {id: id});
    req.body = lion;
    next();
})

lionRouter.get('/', (req, res) => {
    res.setHeader('Content-Type', 'lionRouterlication/json');// Doesn't get changed or lionRouterlied for non modified data
    res.status(200).send(lions);
});

lionRouter.get('/:id', (req, res, next) => {
    if ( req.body !== '') {
        res.json(req.body); 
    } 
    next(new Error(`No Lions Found with id = ${req.params.id}`));
})

lionRouter.post('/', updateId, (req, res) => {
    lions.push(req.body);
    res.json(req.body);
});

lionRouter.put('/:id', (req, res) => {
    let lion = req.body;
    for( let i = 0; i < lions.length; i++){
        if ( req.params.id === lions[i].id ){
            lions[i] = lion;
            break;
        }
    }
    res.json(lions);
});

lionRouter.delete('/:id', (req, res) => {
    for( let i = 0; i < lions.length; i++){
        if ( req.params.id === lions[i].id ){
            lions.splice(i-1, 1);
            break;
        }
    }
    res.json(lions);
});

//Error handling Middlewares
lionRouter.use( (err, req, res, next) => {
    console.log("this is in error handler");
    console.log(err);
    next();
});

module.exports = lionRouter;