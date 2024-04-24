/*
 * Title: Sample Handler
 * Description: Sample Handler
 * Author: Arup Saha
 * Date: 24/04/2024
 *
 */

// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    // console.log(requestProperties);
    callback(200, {
        message: 'This is a sample url',
    });
};

module.exports = handler;
