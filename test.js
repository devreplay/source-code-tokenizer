const fs = require('fs');
const vsctm = require('source-code-tokenizer');
const oniguruma = require('oniguruma');

/**
 * Utility to read a file as a promise
 */
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => error ? reject(error) : resolve(data));
    })
}

