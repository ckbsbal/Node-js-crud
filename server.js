var express = require('express');
var bodyParser = require('body-parser');



var app = express();


const cors = require("cors")

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ],
};
app.use(cors(corsOpts));
app.options('*', cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine','ejs')

 
app.get('/',function(req,res){
    res.render('index',{
        topicHead : 'data Form',
    });
    console.log('user accessing Home page');
});


const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.post('/whatsapp', function(req, res, next) {
  console.log("message==",req.body)
  const twiml = new MessagingResponse();
  twiml.message('This is a response from server');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});


app.post('/message',function(req,res){

    console.log("data",req.body)



    var mqtt = require('mqtt')

    var options = {
        host: 'bbf550b949034545af517b34983a136d.s1.eu.hivemq.cloud',
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
    client.subscribe('loveBox');
    
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
