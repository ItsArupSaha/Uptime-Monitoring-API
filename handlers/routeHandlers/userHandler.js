/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
/*
 * Title: User Handler
 * Description: Handler to handle user related routes
 * Author: Arup Saha
 * Date: 05/05/2024
 *
 */

// dependencies
const data = require('../../lib/data');

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    // callback(200, { message: 'This is an user url' });

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

// internal scaffolding
handler._users = {};

handler._users.post = (requestProperties, callback) => {
    const { body } = requestProperties;

    // validation of body properties
    const firstName =
        typeof body.firstName === 'string' && body.firstName.trim().length > 0
            ? body.firstName
            : false;
    const lastName =
        typeof body.lastName === 'string' && body.lastName.trim().length > 0
            ? body.lastName
            : false;

    const phone =
        typeof body.phone === 'string' && body.phone.trim().length === 11 ? body.phone : false;

    const password =
        typeof body.password === 'string' && body.password.trim().length > 0
            ? body.password
            : false;

    const tosAggrement = typeof body.tosAggrement === 'boolean';

    if (firstName && lastName && phone && password && tosAggrement) {
        // check the existing status of this user
        data.read('users', phone, (err, user) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                };
            } else {
                callback(500, 'There was a probelm in server side!');
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request.',
        });
    }
};
handler._users.get = (requestProperties, callback) => {
    callback(200);
};
handler._users.put = (requestProperties, callback) => {};
handler._users.delete = (requestProperties, callback) => {};

module.exports = handler;
