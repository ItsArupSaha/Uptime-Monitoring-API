/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Arup Saha
 * Date: 24/04/2024
 *
 */

// dependencies
const http = require('http');

const { handleReqRes } = require('./helpers/handleReqRes');

// App object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 3000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    });
};

// handling Request Response
app.handleReqRes = handleReqRes;

// Start the server
app.createServer();
