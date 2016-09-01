'use strict';

var fs = require('fs');

function Licensor(options) {

    var self = this;

    if (!options || typeof options !== "object" || !Object.keys(options).length) {
        throw new Error("No options are provided!");
    }

    var fileCheck = function (path, str) {
        if (!path) {
            throw new Error("No " + str + " is specified!");
        }
        if (!fs.existsSync(path)) {
            throw new Error(str + " doesn't exist!");
        }
        if (!fs.statSync(path).isFile()) {
            throw new Error(str + " isn't a file!");
        }
    };

    var privateKeyPath = options.privateKeyPath;
    if (privateKeyPath && fileCheck(privateKeyPath)) {
        self.privateKeyPath = privateKeyPath;
    }

    var publicKeyPath = options.publicKeyPath;
    if (publicKeyPath && fileCheck(publicKeyPath)) {
        self.publicKeyPath = publicKeyPath;
    }

}

Licensor.prototype = {
    privateKeyPath: null,
    publicKeyPath: null,

    generateLicense: function(args, callback) {
        var self = this;
        args.license = 'blahblah';
        callback(args);
    },

    checkLicense: function(args, callback) {

    }
};

module.exports = Licensor;