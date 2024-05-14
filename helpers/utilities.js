/*
 * Title: Utilities
 * Description: important utility functions
 * Author: Arup Saha
 * Date: 14/05/2024
 *
 */

// dependencies

// module scaffolding
const utilities = {};

// parse JSON string to Object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};

module.exports = utilities;
