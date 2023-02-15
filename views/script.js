function options() {
  document.getElementById("action_menu").toggle();
}

function send() {
  var payload = getMessageFromTextBox();

  var topic = "testTopic";
  var message = new Messaging.Message(payload);
  message.destinationName = topic;
  message.qos = 0;
  message.retained = true;
  this.client.send(message);
  postMessageOnWebsite(payload);
}

function getMessageFromTextBox() {
  var message = document
    .getElementById("message-text-area")
    .value.replaceAll("\n", "");
  document.getElementById("message-text-area").value = "";
  return message;
}

function isNotEmptyString(message) {
  return !(message.trim() === "");
}

function postMessageOnWebsite(message) {
  var messagesDiv = document.getElementById("chat-area");

  document.getElementById("chat-area").innerHTML += newMessage(message);
}

function newMessage(message) {
  var message =
    '<div class="d-flex justify-content-end mb-4">\n' +
    '<div class="msg_cotainer_send">\n' +
    message +
    "\n" +
    //"<span class=\"msg_time_send\">9:10 AM, Today</span>\n" +
    "</div>\n" +
    "</div>";
  return message;
}

function send_message() {
  var payload = document.getElementById("n1").value;
  var topic = "testTopic";
  var message = new Messaging.Message(payload);
  message.destinationName = topic;
  message.qos = 0;
  message.retained = true;
  this.client.send(message);
}

function mqttConnect() {
  var host = "f48ee08ab11a445eb674d5c74cbc9aa8.s2.eu.hivemq.cloud";
  var port = 8884;
  var clientId = "clientId-BOllEDPwtP";
  var username = "Chandan";
  var password = "Chandan@1234";
  // var keepAlive = parseInt($('#keepAliveInput').val());
  // var cleanSession = $('#cleanSessionInput').is(':checked');
  var lwTopic = "";
  var lwQos = 0;
  var lwRetain = false;
  var lwMessage = "";
  var ssl = true;
  console.log(host, port, clientId, username, password, ssl);

  this.client = new Messaging.Client(host, port, clientId);
  this.client.onConnectionLost = this.onConnectionLost;
  this.client.onMessageArrived = this.onMessageArrived;

  var options = {
    timeout: 3,
    keepAliveInterval: 60,
    cleanSession: true,
    useSSL: ssl,
    onSuccess: this.onConnect,
    onFailure: this.onFail,
  };

  if (username.length > 0) {
    options.userName = username;
  }
  if (password.length > 0) {
    options.password = password;
  }
  if (lwTopic.length > 0) {
    var willmsg = new Messaging.Message(lwMessage);
    willmsg.qos = lwQos;
    willmsg.destinationName = lwTopic;
    willmsg.retained = lwRetain;
    options.willMessage = willmsg;
  }

  var status = this.client.connect(options);
  console.log(status);
}
function onConnectionLost(responseObject) {
  console.log("onConnectionLost:" + responseObject.errorMessage);
}

function onMessageArrived(message) {
  console.log(message);
}

function onConnect() {
  console.log("connected");
}
function onFail(message) {
  console.log("error: " + message.errorMessage);
}

window.onload = mqttConnect;
