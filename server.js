<<<<<<< HEAD
var express = require("express")
var app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var port = process.env.port || 3006;
const addTwoNumber= (n1,n2) => {
    return n1+n2;
}
app.get("/addTwoNumber", (req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2=parseInt(req.query.n2);
    const result = addTwoNumber(n1,n2);
    res.json({statuscocde:200, data: result }); 
});

app.listen(port,()=>{
console.log("App listening to: "+port)
})
=======
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('./dbConnection');
const router = require('./routers/router');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/cat', router);

// Handle socket.io connections
io.on('connection', (socket) => {
    console.log('a client is connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(() => {
        const randomNumber = parseInt(Math.random() * 10);
        socket.emit('number', randomNumber);
        console.log('Emitting Number: ' + randomNumber);
    }, 1000);
});

// Start the HTTP server
http.listen(port, () => {
    console.log(`Express server started on port ${port}`);
});
>>>>>>> 5148369 (week 7)
