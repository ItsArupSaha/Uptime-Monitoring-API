/*
 * Title: Handle Request Response
 * Description: Handle Request Response
 * Author: Arup Saha
 * Date: 24/04/2024
 *
 */

// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

// module scaffolding
const handler = {};

// Handling request response
handler.handleReqRes = (req, res) => {
    // request handling
    // get the request properties
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/|\/$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    // handle routing
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    // decode the body of request url.
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        // choose the proper handler
        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);

            // return the final response
            res.writeHead(statusCode); // setting the status code of response.
            res.end(payloadString);
        });

        // response handle
        res.end('hello server');
    });
};

module.exports = handler;
