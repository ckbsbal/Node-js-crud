var express = require('express');
var bodyParser = require('body-parser');
const connectDB=require('./config/connect')
// create express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
const mongoose=require('mongoose');


// Configuring the database
// var dbConfig = require('./config/connect.js');
// var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// mongoose.connect(dbConfig.url, {
// 	useMongoClient: true
// });
// mongoose.set('strictQuery', false);
connectDB()

// mongoose.connection.on('error', function() {
//     console.log('Could not connect to the database. Exiting now...');
//     process.exit();
// });
// mongoose.connection.once('open', function() {
//     console.log("Successfully connected to the database");
// })

// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/note.routes.js')(app);
require('./app/routes/location.routes.js')(app);

// listen for requests
let PORT=6000
app.listen(PORT, function(){
    console.log(`Server is listening on port ${PORT}`);
});
