/*
 * Title: Routes
 * Description: Application Routes
 * Author: Arup Saha
 * Date: 24/04/2024
 *
 */

// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');

// module scaffolding
const routes = {
    sample: sampleHandler,
};

module.exports = routes;
