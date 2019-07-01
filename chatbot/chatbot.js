"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const restService = express();

const http = require("http");
const API_KEY = require("./apiKey");

restService.use(bodyParser.urlencoded({ extended: true }));
restService.use(bodyParser.json());

restService.post("/chatbot", function(req, res) {
    console.log(
        "-- RECEIVING THE FULFILLMENT REQUEST ON THE BOT SIDE --",
        req.body.queryResult
    );
    console.log(req.json);

   

    //add ur webhook logic here
    const movieToSearch =
        req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.cinema ?
        req.body.queryResult.parameters.cinema :
        "The Godfather";
    const reqUrl = encodeURI(
        `http://www.omdbapi.com/?t=${movieToSearch}&apikey=${API_KEY}`
    );

    console.log(reqUrl);

    http.get(
        reqUrl,
        responseFromAPI => {
            let completeResponse = "";
            responseFromAPI.on("data", chunk => {
                completeResponse += chunk;
            });
            responseFromAPI.on("end", () => {
                const movie = JSON.parse(completeResponse);
                let dataToSend =
                    movieToSearch === "The Godfather" ?
                    `No idea. Here's some info on 'The Godfather' instead.\n` :
                    "";
                dataToSend += `${movie.Title} is a ${movie.Actors} starer ${
          movie.Genre
        } movie, released in ${movie.Year}. It was directed by ${
          movie.Director
        }`;

                res.json({
                    fulfillmentText: dataToSend,
                    fulfillmentMessages: [{
                        text: { text: [dataToSend] }
                    }],
                    source: "chatbot"
                });

               
            });
        },
        error => {
            return res.json({
                fulfillmentText: "Something wrong",
                source: "get-movie-details"
            });
        }
    );
});

restService.listen(process.env.PORT || 9000, () => {
    console.log("Server is up and running at 9000...");
});