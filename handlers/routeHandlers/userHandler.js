/*
 * Title: User Handler
 * Description: Handler to handle user related routes
 * Author: Arup Saha
 * Date: 05/05/2024
 *
 */

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    // console.log(requestProperties);
    callback(200, {
        message: 'This is a user url',
    });
};

module.exports = handler;
