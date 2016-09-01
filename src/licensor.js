'use strict';

var fs = require('fs'),
    crypto = require('crypto');

function Licensor(secret) {

    var self = this;     
    
    if( !secret ) {
        throw new Error('No secret specified');
    }       
    
    this.secret = secret;    
}

Licensor.prototype = {
    secret: null,    

    generateLicense: function (args, callback) {
        var self = this;
        var hmac = crypto.createHmac('sha256', this.secret);

        var licenseText = JSON.stringify(args);

        hmac.update(licenseText);
        args.key = hmac.digest('hex');
                
        callback(args);        
    },

    verifyLicense: function (license, callback) {
        var key = license.key;
        delete license['key'];        
        
        this.generateLicense(license, function(testLicense) {            
             var isMatch = (key == testLicense.key);
             callback(isMatch);
        })
        
    }
};

module.exports = Licensor;