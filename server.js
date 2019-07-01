"use strict";
const express = require("express");
const bodyParser = require("body-parser");
var https = require("https");
var fs = require("fs");
const restService = express();
// set the view engine to ejs
restService.set("view engine", "ejs");
restService.use(express.static("public"));
restService.use(bodyParser.urlencoded({
    extended: true
}));
restService.use(bodyParser.json());

restService.use(express.static("public"));

var messagesList = [];
const projectId = "mywidgetagent";

//This sessionId is random... can be set anything
const sessionId = "6978519da183d1a0888e802ed2528075447fa5c7";

//const query = 'What is your account number ?';
const query = "What is my address ?";
const languageCode = "en-US";

// Instantiate a DialogFlow client.
const dialogflow = require("dialogflow");

//This is from the json file

let privateKey = ""
//This is also from the project json file
let clientEmail = "";
let config = {
    credentials: {
        private_key: privateKey,
        client_email: clientEmail
    }
};
const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
const request = {
    session: sessionPath,
    queryInput: {
        text: {
            text: query,
            languageCode: languageCode
        }
    }
};

restService.get("/", function(req, res) {
    messagesList = [];
    res.render("pages/listMessages", {
        mymessages: messagesList
    });
});

restService.post("/chatbot", function(req, res) {
    console.log("-- SENDING REQUEST TO BOT --", req.body);
    messagesList.push(req.body.message);
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: req.body.message,
                languageCode: languageCode
            }
        }
    };

    function userSubmitInfo(req, res) {}

    // Send request and log result
    sessionClient
        .detectIntent(request)
        .then(responses => {
            console.log("Detected intent");
            console.log(responses);
            const result = responses[0].queryResult; 
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);

            if (result.intent) {
                console.log(`  Intent: ${result.intent.displayName}`);
            } else {
                console.log(`  No intent matched.`);
            }

            messagesList.push(result.fulfillmentText);
            res.send(messagesList);
        })
        .catch(err => {
            console.error("ERROR:", err);
        });
});

restService.post("/testData", function(req, res) {
    console.log("all is well .....", req.body.message);
    res.send("Thank You");
});

var port = process.env.PORT || 8000;

var options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
};

https.createServer(options, restService).listen(port, function() {
    console.log("listening on port " + port);
});

