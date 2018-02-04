var app = require('./server/server');

app.listen(3000, (err) => {
    if (err) { console.log(err);};
    console.log("Server started on port: 3000");
})