/*
 * Title: Routes
 * Description: Application Routes
 * Author: Arup Saha
 * Date: 24/04/2024
 *
 */

// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');

// module scaffolding
const routes = {
    sample: sampleHandler,
    user: userHandler,
};

module.exports = routes;
