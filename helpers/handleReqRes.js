/*
 Title: Handle Request Response
 Description: this is the practice version
 Author: Arup Saha
 Date: 24/04/24
*/

// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

// module scaffolding
const handler = {};

// handling request response
handler.handleReqRes = (req, res) => {
    // handle request
    // get the request properties
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/|\/$/g, '');
    const queryStringObject = parsedUrl.query;
    const method = req.method.toLowerCase();
    const headerObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        queryStringObject,
        method,
        headerObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 5000;
            payload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
};

module.exports = handler;
