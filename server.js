var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())





app.post('/message',function(req,res){

    console.log("data",req.body)



    var mqtt = require('mqtt')

    var options = {
        host: 'f48ee08ab11a445eb674d5c74cbc9aa8.s2.eu.hivemq.cloud',
        port: 8883,
        protocol: 'mqtts',
        username: 'Chandan',
        password: 'Chandan@1234'
    }
    
    // initialize the MQTT client
    var client = mqtt.connect(options);
    
    // setup the callbacks
    client.on('connect', function () {
        console.log('Connected');
    });
    
    client.on('error', function (error) {
        console.log(error);
    });
    
    client.on('message', function (topic, message) {
        // called each time a message is received
        console.log('Received message:', topic, message.toString());
    });
    
    // subscribe to topic 'my/test/topic'
    client.subscribe('my/test/topic');
    
    // publish message 'Hello' to topic 'my/test/topic'
    client.publish(req.body.topic, req.body.message);
    res.send("done")
});


app.get('/', function(req, res){

   
    res.json({"message": "hello."});
});


// listen for requests
let PORT=3001
app.listen(PORT, function(){
    console.log(`Server is listening on port ${PORT}`);
});
