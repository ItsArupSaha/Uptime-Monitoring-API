/*
 Title: Data
 Description: Data related things
 Author: Arup Saha
 Date: 29/04/24
*/

// dependencies
const fs = require('fs');
const path = require('path');

// module scaffolding
const bin = {};

// base directory of the data folder
const baseDirectory = path.join(__dirname, '/../.data/');

// creating a new file
bin.create = (dir, file, data, callback) => {
    // open file for writing
    fs.open(`${baseDirectory + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);

            // write data to the file and close it
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('error closing the new file.');
                        }
                    });
                } else {
                    callback('Error writing new file.');
                }
            });
        } else {
            callback(err);
        }
    });
};

// read data from a file
bin.read = (dir, file, callback) => {
    fs.readFile(`${baseDirectory + dir}/${file}.json`, 'utf-8', (err, data) => {
        callback(err, data);
    });
};

// update an existing file
bin.update = (dir, file, data, callback) => {
    // open the file
    fs.open(`${baseDirectory + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);

            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback('Error closing the file');
                                }
                            });
                        } else {
                            callback('Error writing to file');
                        }
                    });
                } else {
                    callback("Error trauncating the file'");
                }
            });
        } else {
            callback('Error opening file.');
        }
    });
};

// delete an existing file
bin.delete = (dir, file, callback) => {
    fs.unlink(`${baseDirectory + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Error deleting file');
        }
    });
};

module.exports = bin;
